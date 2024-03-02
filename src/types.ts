interface FileData {
  type: string;
  name: string;
  meta?: string;
  data?: FileData[];
}

export default FileData;
