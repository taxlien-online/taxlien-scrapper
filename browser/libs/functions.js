import fs from 'fs-extra';

export function savePictures(page, config) {
    return;

    
    const existingResponseHandlers = page.listeners('response');
    page.on('response', async response => {
        // Вызов существующих обработчиков
        for (const handler of existingResponseHandlers) {
            handler.call(page, response);
        }
        // наше
        const url = response.url();
        if (response.request().resourceType() === 'image') {
            response.buffer().then(file => {
                checkAndCreateDir(config.RESULTS_PATH + "/last")
                const fileName = url.split('/').pop();
                const filePath = config.RESULTS_PATH + "/last/" + fileName;
                const writeStream = fs.createWriteStream(filePath);
                writeStream.write(file);
            });
        }


    });
}

export function movePictures(page, config, id) {
    const sourceDir = config.RESULTS_PATH + "/last";  // Укажите путь к исходной директории
    const destDir = config.RESULTS_PATH + `/${id}`;  // Укажите путь к директории назначения

    fs.move(sourceDir, destDir, err => {
        if (err) {
            return console.error(err);
        }
        console.log('Directory moved successfully!');
    });
}


export async function checkAndCreateDir(path) {
    try {
        // Проверка существования директории
        const exists = fs.pathExists(path);//await 

        if (!exists) {
            // Создание директории, если она не существует
            //await 
            fs.ensureDir(path);
            console.log(`Директория ${path} создана.`);
        } else {
            console.log(`Директория ${path} уже существует.`);
        }
    } catch (err) {
        console.error('Ошибка при проверке или создании директории:', err);
    }
}


export async function writeVariableToFile(filePath, variable) {
    fs.writeFile(filePath, variable.toString(), (err) => {
        if (err) {
            console.error('Ошибка при записи в файл:', err);
        } else {
            console.log(`Переменная записана в файл ${filePath}`);
        }
    });
}



export async function readVariableFromFile(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return data;
    } catch (err) {
        console.error('Ошибка при чтении из файла:', err);
        return null;
    }
}