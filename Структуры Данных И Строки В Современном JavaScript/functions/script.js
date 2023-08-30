const btn = document.querySelector('.btn')

const survey = {
    question: 'What programming language would you like to learn?',
    options: ['0: JavaScript', '1: Python', '2: Ruby', '3: Java', '4: C#'],
    answers: new Array(5).fill(0),
    logNewAnswer() {
        const answersLength = this.answers.length;
        const answer = Number(prompt(`${this.question}\n${this.options.join('\n')}\n(Enter option number)`));
        answer < answersLength && answer >= 0 ? this.answers[answer]++ : alert(`Enter option less than ${answersLength} and >= than 0`)
        console.log(this.answers);
        this.printResults()
        this.printResults('string')
    },
    printResults(type = 'array') {
        if (type === 'array'){
            console.log(this.answers);
        } else if(type === 'string') {
            console.log(`Survey results: ${this.answers.join(',')}`);
        }
    },

   }

btn.addEventListener('click', e => survey.logNewAnswer())