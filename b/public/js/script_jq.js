(()=>{

  const me={
    add(a,b){
        if (typeof a !== 'number') throw 'Must provide a number';
        if (isNaN(a)) throw 'Must provide a number';
        if (typeof b !== 'number') throw 'Must provide a number';
        if (isNaN(b)) throw 'Must provide a number';
        return a+b
    },
    substract(a,b){
        if (typeof a !== 'number') throw 'Must provide a number';
        if (isNaN(a)) throw 'Must provide a number';
        if (typeof b !== 'number') throw 'Must provide a number';
        if (isNaN(b)) throw 'Must provide a number';
        return a-b
    },
    multiply(a,b){
        if (typeof a !== 'number') throw 'Must provide a number';
        if (isNaN(a)) throw 'Must provide a number';
        if (typeof b !== 'number') throw 'Must provide a number';
        if (isNaN(b)) throw 'Must provide a number';
        return a*b
    },
    divide(a,b){
        if (typeof a !== 'number') throw 'Must provide a number';
        if (isNaN(a)) throw 'Must provide a number';
        if (typeof b !== 'number') throw 'Must provide a number';
        if (isNaN(b)) throw 'Must provide a number';
        return a/b
    }
}

operationStringToFunction=(operation)=>{
    if(!operation)throw 'No operation provided'
    const returnFunction=me[operation]
    if(returnFunction===undefined)throw 'No such operation'
    return returnFunction
}

const staticForm=document.getElementById('staticForm')

if(staticForm){
    const number1=document.getElementById('number1')
    const number2=document.getElementById('number2')
    const operation=document.getElementById('operation')

    const errorContainer=document.getElementById('errorContainer')
    const errorText=errorContainer.getElementsByClassName('textGoesHere')[0]

    const resultContainer=document.getElementById('resultContainer')
    const resultText=resultContainer.getElementsByClassName('textGoesHere')[0]

    staticForm.addEventListener('submit',(event)=>{
        event.preventDefault()

        try{
            errorContainer.classList.add('hidden')
            resultContainer.classList.add('hidden')

            const number1Value=parseInt(number1.value)
            const number2Value=parseInt(number2.value)
            const operationValue=operationStringToFunction(operation.value)

            const result=operationValue(number1Value,number2Value)
        
            resultText.textContent='The result is '+result
            resultContainer.classList.remove('hidden')

        }catch(e){
            errorText.textContent=e
            errorContainer.classList.remove('hidden')
        }
    })

}


  $('#myForm').submit((event) => {
  event.preventDefault();
  if ($('#text_input').val().trim()) {
    $('#error').hide();
    $('#formLabel').removeClass('error');
    $('#text_input').removeClass('inputClass');
    const li = `<li> ${$('#text_input').val()} </li>`;
    $('#list').append(li);
    $('#myForm').trigger('reset');
    $('#text_input').focus();
  } else {
    $('#error').show();
    $('#error').html('You must enter an input value');
    $('#formLabel').addClass('error');
    $('#text_input').addClass('inputClass');
    $('#text_input').focus();
    $('#text_input').value = '';
  }
})
})()
