let content = "Hello Zip";
let data = new Blob([content], { type: 'application/zip' });
let arrayOfBlob = new Array<Blob>();
arrayOfBlob.push(data);
let applicationZip = new File(arrayOfBlob, "Mock.zip", { type: 'application/zip' });
export const tdkFile1JSON = {
    _id: '1',
    fileName: 'file name1',
    visible: true,
    date: "2012-04-23T18:25:43.511Z"
};
export const tdkFile2JSON = {
    _id: '1',
    fileName: 'file name1',
    visible: false,
    date: "2012-04-23T18:25:43.511Z"
};
export const errorTDKFile1JSON = {

}
export const errorTDKFile2JSON = {
    _id: '1',
    fileName: 'file name1'
}