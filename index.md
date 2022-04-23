---
layout: default
---


## Contact

- {{ site.data.common.email.text }}
- [{{ site.data.common.social.github.text }}]({{ site.data.common.social.github.url }})
- [{{ site.data.common.social.linkedin.text }}]({{ site.data.common.social.linkedin.url }})

Download Resume in [PDF]({{ site.data.common.resume.pdf }}) or [text]({{ site.data.common.resume.txt }}) format.

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
