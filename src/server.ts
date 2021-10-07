import { getPort } from "./configs/app.config";
import appFactory from './app';


(async function() {
    const PORT = getPort();
    const app = await appFactory();
    app.listen(PORT, () => console.log(`[INFO] Listening on port ${PORT}`))
})();