export default function({$axios, store}) {
  $axios.onError(error => {
    if (error.response.status === 422) {
      store.dispatch('validation/setErrors', error.response.data.error.errors_validation);
    }

    return Promise.reject(error);
  });
  
  $axios.onRequest(() => {
    store.dispatch('validation/clearErrors');
  });
}