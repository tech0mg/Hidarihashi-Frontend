import { Document, Page } from 'react-pdf';

const [totalPages, setTotalPages] = useState(0);
const apiUrl = process.env.NEXT_PUBLIC_API_URL; 

const onLoadSuccess = ({numPages}) => {
  setTotalPages(numPages);
}

const pdfContents = [];
for(let i=0; i<totalPages; i++){
  pdfContents.push(
    <Page key={i} pageNumber={i+1} width={300} />
  );
}

return (
  <div style={{ width: "100%", height: "100%", overflow:'scroll' }}>
    <Document file='PDFのURL' onLoadSuccess={onLoadSuccess}>
      {pdfContents}
    </Document>
  </div>
);


