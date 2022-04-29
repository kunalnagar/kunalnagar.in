const fs = require('fs')
const { getResumeJson } = require('./parse_file')
const PDFDocument = require('pdfkit')

const json = getResumeJson()

const doc = new PDFDocument({
  margins: {
    top: 40,
    left: 40,
    bottom: 20,
    right: 40
  }
})

const path = process.cwd() + '/assets/downloads/Resume-KunalNagar.pdf'

renderBio()
doc.moveDown(2)
renderSkills()
doc.moveDown(2)
renderWorkExperience()
doc.moveDown(2)
renderEducation()

doc.end()
doc.pipe(fs.createWriteStream(path))

function renderBio() {
  doc.fontSize(18)
    .font('Helvetica-Bold')
    .text(json.bio.name)
  doc.fontSize(14)
    .font('Helvetica-Oblique')
    .text(json.bio.title)
  doc.font('Helvetica')
    .text(json.contact.email.privacyText)
  doc.text('www.kunalnagar.in')
}

function renderSkills() {
  const skills = json.skills.map(skill => skill.join(', '))
  doc.font('Helvetica-Bold')
    .text('Skills')
    .moveDown()
    .font('Helvetica')
    .list(skills, {
      indent: 20,
    })
}

function renderWorkExperience() {
  doc.font('Helvetica-Bold')
    .text('Work Experience')
    .font('Helvetica')
  json.experiences.forEach(experience => {
    doc.moveDown()
      .font('Helvetica-Bold')
      .text(`${experience.title}, ${experience.position}, ${experience.location}, ${experience.tenure}`)
      .font('Helvetica')
      .list(experience.points, {
        indent: 20
      })
  })
}

function renderEducation() {
  const education = json.education[0]
  doc.font('Helvetica-Bold')
    .text('Education')
    .font('Helvetica')
    .moveDown()
    .text(`${education.degree}, ${education.field}, ${education.institution}, ${education.tenure}`)
    .text(`CGPA: ${education.cgpa}`)
}
