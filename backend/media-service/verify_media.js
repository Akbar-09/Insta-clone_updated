const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

async function verify() {
    console.log('Starting verification...');

    // 1. Create a dummy file
    const filePath = path.join(__dirname, 'test-image.txt');
    fs.writeFileSync(filePath, 'This is a test image content');
    console.log('Created dummy file at:', filePath);

    try {
        // 2. Prepare Form Data
        const form = new FormData();
        form.append('file', fs.createReadStream(filePath));

        // 3. Upload
        const response = await axios.post('http://localhost:5013/upload', form, {
            headers: {
                ...form.getHeaders()
            }
        });

        console.log('Upload Response Status:', response.status);
        console.log('Upload Response Data:', response.data);

        // 4. Verify
        if (response.status === 201 && response.data.status === 'success' && response.data.data.url) {
            console.log('SUCCESS: File uploaded and URL returned.');

            // Check if file exists in uploads dir
            const uploadedFilename = response.data.data.filename;
            const uploadedPath = path.join(__dirname, 'uploads', uploadedFilename);
            if (fs.existsSync(uploadedPath)) {
                console.log('SUCCESS: Uploaded file found on disk.');
            } else {
                console.log('FAILURE: Uploaded file NOT found on disk.');
            }

        } else {
            console.log('FAILURE: Unexpected response format.');
        }

    } catch (error) {
        console.error('Verification failed:', error.message);
        if (error.response) {
            console.error('Response data:', error.response.data);
        }
    } finally {
        // Cleanup
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    }
}

verify();
