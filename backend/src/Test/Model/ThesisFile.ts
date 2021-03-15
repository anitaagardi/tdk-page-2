let content = "Hello Zip";
let data = new Blob([content], { type: 'application/zip' });
let arrayOfBlob = new Array<Blob>();
arrayOfBlob.push(data);
let applicationZip = new File(arrayOfBlob, "Mock.zip", { type: 'application/zip' });



export const thesisFile1JSON = {
    _id: '1',
    conferenceId: 'conference1',
    tdkFile: {
        _id: '1',
        fileName: 'file name1',
        visible: true,
        date: "2012-04-23T18:25:43.511Z",
        file: applicationZip
    }

}