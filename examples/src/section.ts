export const createSection = (title: string) => {
  const container = document.createElement('section');
  container.innerHTML = `<h3 class="js-title"></h3><div class="js-body"></div>`;

  const titleEl = container.querySelector('.js-title');
  titleEl.textContent = title;

  const body = container.querySelector('.js-body');

  return {
    appendTo(el: Node) {
      el.appendChild(container);
      return this;
    },
    appendChild(el: Node) {
      body.appendChild(el);
      return this;
    }
  };
};
