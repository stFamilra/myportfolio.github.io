document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

const textArea = document.querySelector('textarea')
const btn = document.querySelector('button')
let textValue;

textArea.classList.add("textArea");
btn.classList.add('btn');

btn.textContent = 'OK';

const nameTransform = (val) => {
    let value = val;
    let values = value.replace(/\s+/g, ' ').trim().split(' ');
    console.log(values);
    let result = [];
    let mainResult = ''
    for (let k of values){
        result.push(k.split('_'));
    }

    for(let k of result){
        const [firstWords, secondWords] = k;
        console.log(firstWords, secondWords);
        mainResult += [firstWords + secondWords.replace(secondWords[0], secondWords[0].toUpperCase()) + '\n']
    }

    // console.log(result);
    console.log(mainResult);
    return mainResult;

}


btn.addEventListener('click', e => {
    textValue = textArea.value;
    nameTransform(textValue);
})

