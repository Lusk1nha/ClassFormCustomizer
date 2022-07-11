import * as React from 'react';
import { useEffect, useState } from 'react';
import Dropzone, { useDropzone } from 'react-dropzone';

interface IFilePicker {
   maxFiles: number,
   filesAccepted?: Object,
   formSetFuntion: (file: any) => void;
   disabled?: boolean;
}


export function FilePicker(props: IFilePicker) {
   const [fileToUpload, setFileToUpload] = useState<any>(null);
   const [error, setError] = useState<string>('');

   const handleOnDrop = (files) => {

      if (files && files.length) {
         const file = files[0]
         setFileToUpload(file);
         props.formSetFuntion(file);
      }
   }

   return (
      <Dropzone
         maxFiles={props.maxFiles}
         onDrop={(files) => handleOnDrop(files)}
         disabled={!props.disabled == undefined ? false : props.disabled }
      >
         {({ getRootProps, getInputProps }) => (
            <section className="container">
               <div {...getRootProps({ className: 'dropzone' })}>
                  <input {...getInputProps()} />
                  <div>
                     <p>{fileToUpload && fileToUpload != null ? fileToUpload[0].path : 'Arraste o documento nesta área ou clique para selecioná-lo'}</p>
                     <em>
                        {error && error.length > 0 ? error : ''}
                     </em>
                  </div>
               </div>
            </section>
         )}
      </Dropzone>
   );
}
