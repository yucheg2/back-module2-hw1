const yargs = require("yargs")
const { addNote, printNotes, removeNote } = require("./notes.controller")//импортировали
// функции из указанного в скобочках
const pkg = require("./package.json")

yargs.version(pkg.version)

yargs.command({// создаем команду 
    command: "add",//название команды
    describe: "Add new note to list",//описание команды
    builder: {
        title:{
            type: "string",//тип данных передаваемых в параметр
            describe: "Note title",//описание параметра
            demandOption: true//обязателен ли параметр для команды
        }//ключ к объекту - название параметра
    },//параметры которые мы передаем через командную строку
    handler({title}) {// в параметры получаем объект option описаный в builder
        addNote(title)
    }// что эта команда выполняет
})

yargs.command({
    command: "list",
    describe: "Print all notes",
    async handler() {
        printNotes()
    }
})

yargs.command({
    command: "remove",
    describe: "Remove note by id",
    builder: {
        id: {
            type: "string",
            describe: "Note id",
            demandOption: true
        }
    },
    async handler({id}) {
        removeNote(id)
    }
})

yargs.parse()// проинициализировали команды выше(теперь они будут работать 
// через ноду)

