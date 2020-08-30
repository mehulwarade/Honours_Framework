const { spawn } = require('child_process');
// const { exec } = require('child_process');
var mp='mpi'
const ls = spawn('ssh', ['master', `cd ${mp} && mpirun -np 4 python3 helloworld.py`]);
// const lsa = spawn('ls', ['-lh', '/usr']);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});

// exec('ssh pimaster touch ~/abc', (error, stdout, stderr) => {
//     if (error) {
//       console.error(`exec error: ${error}`);
//       return;
//     }
//     console.log(`stdout: ${stdout}`);
//     console.error(`stderr: ${stderr}`);
//   });