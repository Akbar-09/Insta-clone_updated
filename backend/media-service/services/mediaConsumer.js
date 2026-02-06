const amqp = require('amqplib');
const Media = require('../models/Media');
const { r2Client } = require('../config/r2');
const { DeleteObjectCommand } = require('@aws-sdk/client-s3');

const BUCKET_NAME = process.env.R2_BUCKET_NAME;

const connectRabbitMQ = async () => {
    try {
        const connection = await amqp.connect(process.env.RABBITMQ_URI || 'amqp://guest:guest@localhost:5672');
        const channel = await connection.createChannel();
        const exchange = 'instagram-events';

        await channel.assertExchange(exchange, 'topic', { durable: true });
        const q = await channel.assertQueue('media-service-cleanup-queue', { durable: true });

        // Bind for deletion events
        await channel.bindQueue(q.queue, exchange, 'POST_DELETED');
        await channel.bindQueue(q.queue, exchange, 'STORY_DELETED');
        await channel.bindQueue(q.queue, exchange, 'MESSAGE_DELETED');

        console.log('Media Service listening for Cleanup events...');

        channel.consume(q.queue, async (msg) => {
            if (msg.content) {
                const data = JSON.parse(msg.content.toString());
                const routingKey = msg.fields.routingKey;

                console.log(`Received ${routingKey} for media cleanup`);

                try {
                    // Logic to find and delete media
                    let mediaUrl = null;
                    if (routingKey === 'POST_DELETED') mediaUrl = data.mediaUrl;
                    if (routingKey === 'STORY_DELETED') mediaUrl = data.mediaUrl;
                    if (routingKey === 'MESSAGE_DELETED') mediaUrl = data.mediaUrl;

                    if (mediaUrl) {
                        // Find media record by URL
                        const media = await Media.findOne({ where: { url: mediaUrl } });
                        if (media && media.r2Key) {
                            console.log(`Deleting R2 object: ${media.r2Key}`);
                            await r2Client.send(new DeleteObjectCommand({
                                Bucket: BUCKET_NAME,
                                Key: media.r2Key
                            }));

                            if (media.thumbnailUrl) {
                                // Extract key from URL
                                const thumbKey = media.thumbnailUrl.split(`${process.env.R2_PUBLIC_DOMAIN}/`)[1];
                                if (thumbKey) {
                                    await r2Client.send(new DeleteObjectCommand({
                                        Bucket: BUCKET_NAME,
                                        Key: thumbKey
                                    }));
                                }
                            }

                            await media.destroy();
                        }
                    }
                } catch (err) {
                    console.error('Error cleaning up media:', err);
                }

                channel.ack(msg);
            }
        });

    } catch (error) {
        console.error('RabbitMQ Connection Failed in Media Consumer:', error);
    }
};

module.exports = { connectRabbitMQ };
