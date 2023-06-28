// const fs = require("fs")//испортировали стандартный модуль node.js
const fs = require("fs/promises")//версия с промисами
const path = require("path")//пакет помагающий работать с путями файлов
const chalk = require("chalk")

const notesPath = path.join(__dirname, "db.json")
//корректный путь к масиву записей
//1й параметр - путь к нашей директории(используем глобальный объект)
//2й - название файла (если он внутри папки в текущей директории 
// по очереди указываем название папки и файла в конце)

async function addNote(title) {
    // const notes = require(notesPath)//запрашиваем базу данных
    // const boofer = await fs.readFile(notesPath)// получим буфер
    // const decodeBoofer = Buffer.from(boofer).toString("utf-8")
    // декодируем буфер

    const notes = await getNotes()

    const note = {
        title,
        id: Date.now().toString()
    }

    notes.push(note)

    await fs.writeFile(notesPath, JSON.stringify(notes))//перезаписываем
    // файл по указзанному пути на указанную json строчку
    console.log(chalk.green.inverse("Note added!"))// красивая консоль
}

async function getNotes() {
    
    const notes = await fs.readFile(notesPath, {encoding: "utf-8"})

    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

async function printNotes() {
    const notes = await getNotes()

    console.log(chalk.bgBlue("List of notes:"))
    notes.forEach(note => {
        console.log(chalk.blue(note.title))
    });
}

async function removeNote(id) {
    const notes = await getNotes()

    const filtredNotes = notes.filter((note)=> {
        return String(note.id) !== id
    })

    await fs.writeFile(notesPath, JSON.stringify(filtredNotes))
    console.log("Note "+ chalk.red("deleted")+"!")
}

module.exports = {
    addNote, printNotes, removeNote
}//старый экспорт, для работы с нодой