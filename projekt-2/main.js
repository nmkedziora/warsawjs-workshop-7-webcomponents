// created data mocks because of GitHub API restrictions
const URLS = {
  profile: './mocks/github-piecioshka-profile.json',
  repos: './mocks/github-piecioshka-repositories.json'
}

class GithubProfileCardElement extends HTMLElement {
  constructor() {
    super();

    this.shadow = this.attachShadow({mode: 'open'});
  }
  connectedCallback() {
    const $template = document.currentScript.ownerDocument.querySelector('template');
    const $clonedTemplate = $template.cloneNode(true);

    this.getGitHubDetails(URLS.profile)
      .then(data => {
        this.displayAvatarDetails($clonedTemplate, data.avatar_url);
        this.displayUserName($clonedTemplate, data.name);
        this.displayBio($clonedTemplate, data.bio);
        this.displayLocation($clonedTemplate, data.location);
      })
      .then(() => this.getGitHubDetails(URLS.repos))
      .then(data => {
        this.displayRepos($clonedTemplate, data)
      })
      .then(() => {
        this.shadow.appendChild($clonedTemplate.content);
      })
  }
  getGitHubDetails(url) {
    return fetch(url)
      .then(response => response.json());
  }
  displayAvatarDetails(template, src) {
    template.content.querySelector('.avatar img').setAttribute('src', src);
  }
  displayUserName(template, name) {
    template.content.querySelector('.name').textContent = name;
  }
  displayBio(template, bio) {
    template.content.querySelector('.bio').textContent = bio;
  }
  displayLocation(template, location) {
    template.content.querySelector('.location').textContent = location;
  }
  displayRepos(template, repos) {
    for (let repo of repos) {
      const item = document.createElement('li');
      const name = document.createElement('span');
      const stars = document.createElement('span');

      name.textContent = repo.name;
      stars.textContent = `${repo.stargazers_count}*: `;

      item.appendChild(stars);
      item.appendChild(name);
      template.content.querySelector('.repos').appendChild(item);
    }
  }
}
window.customElements.define('github-profile-card-element', GithubProfileCardElement);
