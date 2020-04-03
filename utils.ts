import * as yaml from 'js-yaml'
import * as fs from 'fs'

export class Utils {

     static loadYamlFile(filePath: string): any {
        const yamlDoc = fs.readFileSync(filePath, 'utf8')

        const data = yaml.safeLoad(yamlDoc)

        return data
    }

}
