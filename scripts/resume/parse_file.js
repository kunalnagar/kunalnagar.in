const fs = require('fs')

const getResumeJson = () => {
  const data = fs.readFileSync(process.cwd() + '/_data/resume.json')
  return JSON.parse(data)
}

module.exports = {
  getResumeJson
}
