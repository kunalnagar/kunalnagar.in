const fs = require('fs')
const { getResumeJson } = require('./parse_file')

const json = getResumeJson()

const str = `${json.bio.name}
${json.bio.title}
${json.contact.email.privacyText}
${json.contact.website.text}

SKILLS

${generateSkillsText(json.skills)}
WORK EXPERIENCE
${generateExperiencesText(json.experiences, true)}

EDUCATION

${generateEducationText(json.education[0])}
`
fs.rmSync(process.cwd() + '/assets/downloads', { recursive: true, force: true })
fs.mkdirSync(process.cwd() + '/assets/downloads')
fs.writeFileSync(process.cwd() + json.download.txt, str)

function generateSkillsText(skillsJson) {
  let text = ''
  skillsJson.forEach(skillLine => {
    text += `- ${skillLine.join(', ')}
`
  })
  return text
}

function generateExperiencesText(experiencesJson, ignoreCompanyLinks) {
  let text = ''
  experiencesJson.forEach(experience => {
    const company = ignoreCompanyLinks ? experience.title : `[${experience.title}](${experience.website})`
    text += `
${company}, ${experience.position}, ${experience.location}, ${experience.tenure}

`
    experience.points.forEach(point => {
      text += `- ${point}
`
    })
  })
  return text
}

function generateEducationText(educationJson) {
  let text = ''
  text += `${educationJson.degree}, ${educationJson.field}, ${educationJson.institution}, ${educationJson.tenure}
CGPA ${educationJson.cgpa}
`
  return text
}
