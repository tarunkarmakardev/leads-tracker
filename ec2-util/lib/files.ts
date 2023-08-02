import { writeFile, mkdir } from "fs/promises";
import path from "path";
import config from "../config.json";

export const createFileHandler = async (basename: string) => {
  const folderName = path.join(basename, config.filePaths.base);
  await mkdir(folderName, { recursive: true });
  return {
    async write(fileName: string, data: string) {
      console.log(`Creating ${fileName}...`);
      await writeFile(path.join(folderName, fileName), data);
      console.log(`Created ${fileName}...`);
    },
  };
};
