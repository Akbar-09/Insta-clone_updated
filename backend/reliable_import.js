const { execSync } = require('child_process');

try {
    console.log('Dropping database...');
    execSync('docker exec test_postgres psql -U postgres -c "DROP DATABASE IF EXISTS instagram;"');

    console.log('Creating database...');
    execSync('docker exec test_postgres psql -U postgres -c "CREATE DATABASE instagram;"');

    console.log('Importing data (this may take a minute)...');
    // We use a temporary file or pipe
    // On Windows, piping large files can be tricky with execSync
    // We'll use psql -f but the file is outside the container.
    // We can use docker cp to put the file inside the container first for speed and reliability.

    console.log('Copying dump to container...');
    execSync('docker cp ../database_dump.sql test_postgres:/tmp/dump.sql');

    console.log('Running import...');
    const result = execSync('docker exec test_postgres psql -U postgres -d instagram -f /tmp/dump.sql 2>&1', { encoding: 'utf-8' });
    console.log('Import finished.');

    // Check counts
    const counts = execSync('docker exec test_postgres psql -U postgres -d instagram -c "SELECT count(*) FROM \\"Users\\"; SELECT count(*) FROM \\"UserProfiles\\";"', { encoding: 'utf-8' });
    console.log('Verification Counts:');
    console.log(counts);

} catch (e) {
    console.error('Error during import:', e.message);
    if (e.stdout) console.error('Stdout:', e.stdout);
    if (e.stderr) console.error('Stderr:', e.stderr);
}
