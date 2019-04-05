window.onload = function () {
  'use strict';

  var Picker = window.Picker;
  var input = document.querySelector('.docs-date');
  var pickerContainer = document.querySelector('.docs-picker-container');
  var options = {
    show: function (e) {
      console.log(e.type);
    },
    shown: function (e) {
      console.log(e.type);
    },
    hide: function (e) {
      console.log(e.type);
    },
    hidden: function (e) {
      console.log(e.type);
    },
    pick: function (e) {
      console.log(e.type);
    }
  };
  var picker = new Picker(input, options);

  console.log(picker);

  input.addEventListener('change', function (e) {
    console.log(e.type);
  }, false);

  input.addEventListener('show', function (e) {
    console.log(e.type);
  }, false);

  input.addEventListener('shown', function (e) {
    console.log(e.type);
  }, false);

  input.addEventListener('hide', function (e) {
    console.log(e.type);
  }, false);

  input.addEventListener('hidden', function (e) {
    console.log(e.type);
  }, false);

  input.addEventListener('pick', function (e) {
    console.log(e.type);
  }, false);

  document.querySelector('.docs-options').addEventListener('change', function (e) {
    if (!picker) {
      return;
    }

    var target = e.target;
    var type = target.type;
    var name = target.name;
    var value = type === 'checkbox' ? target.checked : target.value;
    var relatedElement;

    switch (name) {
      case 'container':
        if (value) {
          value = pickerContainer;
          pickerContainer.style.display = 'block';
        } else {
          pickerContainer.style.display = 'none';
        }

        break;

      case 'inline':
        relatedElement = document.querySelector('input[name="container"]');

        if (!relatedElement.checked) {
          relatedElement.click();
        }

        break;

      case 'language':
        relatedElement = document.querySelector('input[name="format"]');

        setTimeout(function () {
          relatedElement.placeholder = relatedElement.value = picker.options.format;
        }, 0);
        break;

      // No default
    }

    options[name] = value;
    picker.destroy();
    picker = new Picker(input, options);
  }, false);

  document.querySelector('.docs-methods').addEventListener('click', function (e) {
    if (!picker) {
      return;
    }

    var target = e.target;
    var method = target.getAttribute('data-method');
    var relatedTarget;
    var result;

    if (method) {
      result = picker[method].apply(picker, JSON.parse(target.getAttribute('data-args')));
      relatedTarget = target.getAttribute('data-related-target');

      if (relatedTarget) {
        document.querySelector(relatedTarget).value = result;
      }

      if (method === 'destroy') {
        picker = null;
      }
    }
  });


  // Examples
  // --------------------------------------------------

  new Picker(document.querySelector('.js-date-picker'), {
    format: 'MMM D, YYYY',
    text: {
      title: 'Pick a date',
    },
  });

  new Picker(document.querySelector('.js-time-picker'), {
    format: 'HH:mm',
    headers: true,
    text: {
      title: 'Pick a time',
    },
  });

  new Picker(document.querySelector('.js-full-picker'), {
    controls: true,
    format: 'YYYY-MM-DD HH:mm:ss.SSS',
    headers: true,
  });

  new Picker(document.querySelector('.js-month-picker'), {
    format: 'MMMM',
    text: {
      title: 'Pick a month',
    },
  });

  new Picker(document.querySelector('.js-inline-picker'), {
    controls: true,
    inline: true,
  });

  new Picker(document.querySelector('.js-mini-picker'), {
    container: '.js-mini-picker-container',
    inline: true,
    rows: 1,
  });

  new Picker(document.querySelector('.js-super-picker'), {
    container: '.js-super-picker-container',
    format: 'YYYY年M月D日H时m分',
    increment: {
      minute: 10,
    },
    text: {
      title: '选择日期时间',
      cancel: '取消',
      confirm: '确认',
    },
    translate(type, text) {
      const suffixes = {
        year: '年',
        month: '月',
        day: '日',
        hour: '时',
        minute: '分',
      };

      return Number(text) + suffixes[type];
    },
  });
};
