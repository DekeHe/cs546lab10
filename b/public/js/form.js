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

    $('#myForm').submit((event)=>{
        event.preventDefault()
        if($('#textInput').val().trim()){
            $('#error').hide()
            $('#myForm').removeClass('error')
            $('#textInput').removeClass('inputClass')
            const li=`<li>${$('#textInput').val()}</li>`
            $('#list').append(li)
            $('#myForm').trigger('reset')
            $('#textInput').focus()
        }
        else{
            $('#error').show()
            $('#error').html('You must enter an input value')
            $('#formLabel').addClass('error')
            $('#textInput').addClass('inputClass')
            $('textInput').focus()
            $('#textInput').value=''
        }
    })

})()


    // const myForm=document.getElementById('myForm')
    // const textInput=document.getElementById('textInput')
    // const error=document.getElementById('error')
    // const list=document.getElementById('list')
    // const formLabel=document.getElementById('formLabel')

    // if(myForm){
    //     myForm.addEventListener('submit',(event)=>{
    //         event.preventDefault()
    //         if(textInput.value.trim()){
    //             textInput.classList.remove('inputClass')
    //             error.hidden=true
    //             formLabel.classList.remove('error')

    //             let li=document.createElement('li')
    //             li.innerHTML=textInput.value
    //             list.appendChild(li)
    //             myForm.reset()
    //             textInput.focus()
    //         }else{
    //             textInput.value=''
    //             error.hidden=false
    //             error.innerHTML='You must enter a value'
    //             formLabel.className='error'

    //             textInput.focus()
    //             textInput.classList='inputClass'
    //         }
    //     })
    // }







// number1
// number2
// operation
