
export const loadingUtil = async (parent, textProp, finalState, asyncCallback) => {
    let loadingText = 'Loading';
    let nextState = {};

    let timer = setInterval(() => {
        nextState[textProp] = loadingText;
        parent.setState(nextState);

        if (loadingText.length < 10) {
            loadingText += '.';
        } else {
            loadingText = 'Loading';
        }
    }, 200);

    await asyncCallback();
    
    clearInterval(timer);
    parent.setState(finalState);
};