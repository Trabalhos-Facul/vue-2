new Vue({
  el: '#desafio',
  data: {
    meuNome: 'Rafael',
    idade: 22,
    linkImg: 'data:image/jpeg;base64,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'
  },
  methods: {
    triploIdade: function() {
      return this.idade * 3;
    },
    numeroAleatorio: function() {
      return Math.random()
    }
  }
})