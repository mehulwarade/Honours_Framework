const { spawnSync } = require('child_process');
// const { exec } = require('child_process');
var folder='~/Honours_Framework/algorithms/python_opencv'
var mpirun='mpirun -N 4 -hostfile ../hostfile/hostfile5 echo helloworld'
const ls = spawnSync('ssh', ['master', `cd ${folder} && ${mpirun}`]);
console.log('haaaaaaaahaha');

if(ls.stdout){
  console.log(ls.stdout.toString());
}

console.log('hahaha');
// const lsa = spawn('ls', ['-lh', '/usr']);

// ls.stdout.on('data', (data) => {
//   console.log(`stdout: ${data}`);
// });

// ls.stderr.on('data', (data) => {
//   console.error(`stderr: ${data}`);
// });

// ls.on('close', (code) => {
//   console.log(`child process exited with code ${code}`);
// });

// exec('ssh pimaster touch ~/abc', (error, stdout, stderr) => {
//     if (error) {
//       console.error(`exec error: ${error}`);
//       return;
//     }
//     console.log(`stdout: ${stdout}`);
//     console.error(`stderr: ${stderr}`);
//   });