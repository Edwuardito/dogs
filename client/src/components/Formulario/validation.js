export default function validation(userData,setErrors,setErrSubmit){
let name = '',
    minWeight = '',
    maxWeight = '',
    minHeight = '',
    maxHeight = '',
    minAge = '',
    maxAge = '',
    image = ''

if(!userData.name) name ='fill in this field'
else if(!/^[A-Z].*/.test(userData.name)) name = 'starts with a capital letter'
else if(!/^[A-Za-z\s]+$/.test(userData.name)) name='dont enter numbers or special characters'
else if(userData.name.length > 25) name = 'cannot exceed 25 characters'
else name = ''


if(!userData.minWeight) minWeight ='fill in this field'
else if(userData.minWeight.length > 25) minWeight = 'cannot exceed 25 characters'
else if(userData.minWeight <= 0 || userData.minWeight > 100) minWeight = 'enter a value between 0 and 100'
else minWeight = ''

if(!userData.maxWeight) maxWeight ='fill in this field'
else if(userData.maxWeight.length > 25) maxWeight = 'cannot exceed 25 characters'
else if(userData.maxWeight <= 0 || userData.maxWeight > 100) maxWeight = 'enter a value between 0 and 100'
else if(parseInt(userData.maxWeight) <= userData.minWeight) maxWeight = 'enter a value less than minWeight'
else minWeight = ''

if(!userData.minHeight) minHeight ='fill in this field'
else if(userData.minHeight.length > 25) minHeight = 'cannot exceed 25 characters'
else if(userData.minHeight <= 0 || userData.minHeight > 1046) minHeight = 'enter a value between 0 and 1046'
else minHeight = ''

if(!userData.maxHeight) maxHeight ='fill in this field'
else if(userData.maxHeight.length > 25) maxHeight = 'cannot exceed 25 characters'
else if(userData.maxHeight <= 0 || userData.maxHeight > 1046) maxHeight = 'enter a value between 0 and 1046'
else if(parseInt(userData.maxHeight) <= userData.minHeight) maxHeight = 'enter a value less than minHeight'
else maxHeight = ''

if(!userData.minAge) minAge ='fill in this field'
else if(userData.minAge.length > 2) minAge = 'cannot exceed 2 characters'
else if(userData.minAge <= 0 || userData.minAge > 31) minAge = 'enter a value between 0 and 31'
else minAge = ''

if(!userData.maxAge) maxAge ='fill in this field'
else if(userData.maxAge.length > 2) maxAge = 'cannot exceed 2 characters'
else if(userData.maxAge <= 0 || userData.maxAge > 31) maxAge = 'enter a value between 0 and 31'
else if(parseInt(userData.maxAge) <= userData.minAge) maxAge = 'enter a value less than minAge'
else maxAge = ''


if(!userData.image) image ='fill in this field'
if(!userData.image.includes('https://')) image = 'enter a valide url image'
else image = ''


if((name == '')&&(minWeight == '')&&(maxWeight == '')&&(minHeight == '')&&(maxHeight == '')&&(minAge == '')&&(maxAge == '')&&(image == '')){
    setErrSubmit(false)
}else{
    setErrSubmit(true)
}


setErrors({
    name,
    minWeight,
    maxWeight,
    minHeight,
    maxHeight,
    minAge,
    maxAge,
    image
})
}

    