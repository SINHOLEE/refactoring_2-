
type Photo = {title:string;location:string;date:Date}
type Person = {
    photo:Photo;
    name:string;
}

export default function renderPerson(person:Person):string{
    const result:string[] = [];
    result.push(`<p>${person.name}</p>`)
    result.push(renderPhoto(person.photo))
    result.push(`<p>제목: ${person.photo.title}</p>`)
    result.push(emitPhotoData(person.photo))
    return result.join("\n")
}

function renderPhoto(aPhoto:Photo){
    return[
        '<div>',
        `<p>제목: ${aPhoto.title}</p>`,
        emitPhotoData(aPhoto),
        '</div>',
    ].join('\n')
}

function emitPhotoData(aPhoto:Photo){
    return [
        `<p>위치 : ${aPhoto.location}</p>`,
        `<p>날짜 : ${aPhoto.date.toDateString()}</p>`,
    ].join('\n')
}