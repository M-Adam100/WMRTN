console.log("Running Script");

(async () => {

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms*1000));
    }

    function setInput(selector, value) {
        return new Promise((resolve, reject) => {

            const interval = setInterval(async () => {
                const allSelected = [...document.querySelectorAll(selector)];
                if (allSelected.length) {
                    clearInterval(interval);
                    for (let i = 0; i < allSelected.length; i++) {
                        const temp = allSelected[i];
                        temp.scrollIntoView();
                        const prototype = Object.getPrototypeOf(temp);
                        const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, 'value')?.set;
                        prototypeValueSetter.call(temp, value);
                        temp.dispatchEvent(new Event('input', { bubbles: true }));
                        await sleep(1.5);

                    }
                    resolve(true)
                }

            }, 100);

        })
         
       }

    const setDropDown = async (selector, value) => {
        return new Promise((resolve, reject) => {
            const interval = setInterval(async () => {
                const allSelected = [...document.querySelectorAll(selector)];
                if (allSelected.length) {
                    clearInterval(interval);
                    for (let i = 0; i < allSelected.length; i++) {
                        allSelected[i].scrollIntoView();
                        const allOptions = [...allSelected[i].querySelectorAll('option')];
                        const option = allOptions.filter(option => option.innerText.includes(value))[0];
                        if (option) {
                            allSelected[i].value = option.value;
                            allSelected[i].dispatchEvent(new Event('change', { bubbles: true }));
                        }

                        await sleep(1.5);
                    }
                    resolve(true)
                }
               

            }, 100);
        })
    }

    const allCheckboxes = [...document.querySelectorAll('input[type="checkbox"]')];
    const elements = allCheckboxes.slice(0, 10);

    elements.forEach(item => {
        item.click();
    })

    const button = [...document.querySelectorAll('button')].filter(item => item.innerText.includes('Continue'))[0];

    button.click();

    //   await setInput('input:not([done])', 'Alexander Burks');

    //   await setInput('input:not([done])', 'ajburks@hoosierfamilies.org');


    await setDropDown('select', 'Missing Item');

    await setInput('textarea', 'Never Picked up');

    const button2 = [...document.querySelectorAll('button')].filter(item => item.innerText.includes('Continue'))[0];

    button2.click();

    const submitInterval = setInterval(() => {
        const submitButton = [...document.querySelectorAll('button')].filter(item => item.innerText.includes('Submit'))[0];
        if (submitButton) {
    clearInterval(submitInterval);
    console.log('Submit Button Found!!');
    //submitButton.click();


    // ^ Just Uncomment the code above to make the submit button click work

        }
    }, 100)

  

    




})()
