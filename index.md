---
layout: default
---


## Contact

- {{ site.data.resume.contact.email.privacyText }}
- [{{ site.data.resume.contact.github.text }}]({{ site.data.resume.contact.github.url }})
- [{{ site.data.resume.contact.linkedin.text }}]({{ site.data.resume.contact.linkedin.url }})

Download Resume in [PDF]({{ site.data.resume.download.pdf }}) or [text]({{ site.data.resume.download.txt }}) format.

---

## Skills

{% for skill_line in site.data.resume.skills %}
- {{ skill_line | join: ", " }}
{% endfor %}

## Work Experience

{% for experience in site.data.resume.experiences %}

### [{{ experience.title }}]({{ experience.website }}), {{ experience.position }}, {{ experience.location }}, {{ experience.tenure }}

{% for point in experience.points %}
- {{ point }}
{% endfor %}

{% endfor %}

## Education

{% assign education = site.data.resume.education.first %}

### {{ education.degree }}, {{ education.field }}, {{ education.institution }}, {{ education.tenure }}
CGPA {{ education.cgpa }}
