import openai
openai.api_key = ""
import os
import PyPDF2
import docx

class resume:
    def __init__(self, file_path, summary, raw_text):
        self.file_path = file_path
        self.directory = os.path.dirname(file_path)
        self.file_name = os.path.basename(file_path)
        self.raw_text = raw_text
        self.summary = summary
    
    def get_file_extension(self):
        return os.path.splitext(self.file_path)[-1].lower()
    
    def get_raw_text(self):
        extension = self.get_file_extension()

        if extension == '.txt':
            raw_text = self.read_text_file()
        elif extension == '.docx':
            raw_text = self.read_word_file()
        elif extension == '.pdf':
            raw_text = self.read_pdf_file()
        else:
            raise ValueError("Unsupported file format. Only txt, docx, and pdf are supported.")
        
        return raw_text
    
    def read_text_file(self):
        with open(self.file_path, 'r', encoding='utf-8') as file:
            return file.read()
        
    def read_word_file(self):
        doc = docx.Document(self.file_path)
        full_text = []
        for para in doc.paragraphs:
            full_text.append(para.text)

        return '\n'.join(full_text)
    
    def read_pdf_file(self):
        with open(self.file_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfFileReader(file)
            full_text = []
            for page_num in range(pdf_reader.numPages):
                page = pdf_reader.getPage(page_num)
                full_text.append(page.extract_text())

            return '\n'.join(full_text)

    def summarize_text(self):
        response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=self.raw_text[:4096],
        temperature=0.5,
        max_tokens=500,
        )
        summary = response['choices'][0]['text']

        return summary