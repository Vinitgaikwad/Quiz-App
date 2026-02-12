import { StartServer } from "./server";

function main() {
    try {
        StartServer();
    } catch (err) {
        throw err
    }
}
main();