export const createSection = title => {
  const container = document.createElement('section');
  container.innerHTML = `<h2 class="js-title"></h2><div class="js-body"></div>`;

  const titleEl = container.querySelector('.js-title');
  titleEl.textContent = title;

  const body = container.querySelector('.js-body');

  return {
    appendTo(el: HTMLElement) {
      el.append(container);
      return this;
    },
    appendChild(el: HTMLElement) {
      body.appendChild(el);
      return this;
    }
  };
};
