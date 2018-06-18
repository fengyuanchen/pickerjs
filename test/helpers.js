window.createContainer = () => {
  const container = document.createElement('div');

  document.body.appendChild(container);

  return container;
};

window.createInput = () => {
  const input = document.createElement('input');
  const container = window.createContainer();

  container.appendChild(input);

  return input;
};
