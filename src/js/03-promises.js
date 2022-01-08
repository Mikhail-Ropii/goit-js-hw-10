import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('form')
};

refs.form.addEventListener('submit', onSubmitBtn);

function onSubmitBtn(evt) {
  evt.preventDefault();
  let delay = Number(evt.currentTarget.delay.value);
  let step = Number(evt.currentTarget.step.value);
  let amount = Number(evt.currentTarget.amount.value);

  let position = 0;

  setInterval(() => {

    if (position >= amount) {
      return;
    }
    setTimeout(() => {
      delay += step
    });
    position += 1;
    

    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }, step)
}

 function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
});
return promise;
};






