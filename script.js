const githubUsername = "naeemprasla"; // Change to your GitHub username



// Load profile info
fetch('data/profile.json')
  .then(res => res.json())
  .then(profile => {
    document.getElementById("profile-name").textContent = profile.name;
    document.getElementById("profile-title").textContent = profile.designation;
    document.getElementById("profile-bio").innerHTML = profile.bio;

    const cta = document.getElementById("social-cta");
    profile.socials.forEach(social => {
      const a = document.createElement("a");

      if (social.platform.toLowerCase() === "email") {
        a.href = `mailto:${social.url}`;
      } else {
        a.href = social.url;
        a.target = "_blank";
      }

      a.textContent = social.platform;
      a.classList.add("social-btn");
      cta.appendChild(a);
    });
  });

// Load experience
fetch('data/experience.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("experience-list");
    data.forEach(exp => {
      const div = document.createElement("div");
      div.innerHTML = `
        <h3>${exp.position} at ${exp.company}</h3>
        <p><em>${exp.duration}</em></p>
        <p>${exp.description}</p>
      `;
      container.appendChild(div);
    });
  });

// Load skills
fetch('data/skills.json')
  .then(res => res.json())
  .then(skills => {
    const container = document.getElementById("skills-list");
    skills.forEach(skill => {
      const span = document.createElement("span");
      span.textContent = skill;
      container.appendChild(span);
    });
  });

// Load platforms
fetch('data/platforms.json')
  .then(res => res.json())
  .then(platforms => {
    const container = document.getElementById("platforms-list");
    platforms.forEach(platform => {
      const span = document.createElement("span");
      span.textContent = platform;
      container.appendChild(span);
    });
  });


// Fetch GitHub repos
fetch(`https://api.github.com/users/${githubUsername}/repos`)
  .then(res => res.json())
  .then(data => {
    const repoList = document.getElementById("repo-list");

    const filteredRepos = data.filter(
      repo => !repo.private && repo.name !== "naeemprasla.github.io"
    );

    if (filteredRepos.length === 0) {
      const li = document.createElement("li");
      li.textContent = "No public repositories found.";
      repoList.appendChild(li);
    } else {
      filteredRepos.forEach(repo => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`;
        repoList.appendChild(li);
      });
    }
  })
  .catch(error => {
    console.error("Error fetching repositories:", error);
    const repoList = document.getElementById("repo-list");
    const li = document.createElement("li");
    li.textContent = "Failed to load repositories.";
    repoList.appendChild(li);
  });