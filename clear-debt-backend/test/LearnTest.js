const fnn = (o) => {
    return o + " - x";
}

const xPromise = new Promise((resolve, reject) => {
    if(1+1 == 2){
        resolve(fnn("Yes"));
    }else{
        reject("Nope");
    }
});

xPromise.then(
    resultc => {
        console.log('result :>> ', resultc);
        return "boss";
    }
).then(
    result => {
        console.log('result :>> ', result);
        throw new Error("errrrrr")
        
    }
)
.catch(err => {
    console.log('err :>> ', err);
});

let fetchUser = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({id:1, name: 'deep'});
        }, 3000);
    });
}

fetchUser().then(
    user => {
        console.log('user :>> ', user);
    }
).catch(err => {
    console.log('err :>> ', err);
});