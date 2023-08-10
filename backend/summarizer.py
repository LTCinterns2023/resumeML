from transformers import BartTokenizer, BartForConditionalGeneration
import torch


def summarize(input_text):
    # Load pre-trained BART model and tokenizer
    model_name = 'facebook/bart-large-cnn'
    model = BartForConditionalGeneration.from_pretrained(model_name)
    tokenizer = BartTokenizer.from_pretrained(model_name)

    # Generate summaries
    for text in input_text:
        inputs = tokenizer(text, return_tensors="pt", max_length=1024, truncation=True)

        with torch.no_grad():
            summary_ids = model.generate(inputs.input_ids, num_beams=4, min_length=50, max_length=300, early_stopping=True)

        return tokenizer.decode(summary_ids[0], skip_special_tokens=True)

if __name__ == "__main__":
    print(summarize(["""
    KEVIN LAU University of Waterloo Computer Science and Business Student (cid:211) +1 (647)-637-5331 kkmlau@uwaterloo.ca fl Kevin-Lau (cid:135) kevin-klau (cid:140) Website TECHNICAL SKILLS Languages: Java, HTML/CSS, Javascript, C/C++, Python, Scheme, Bash Frameworks/Libraries React.js, D3.js, Flask, Bootstrap, Java.Awt / Java.Awt.Swing PROJECTS University of Waterloo Course Tracker - Github Link || Website Link Feb 2023 DevelopedawebsitethatusesPython(Selenium)toscrapeUWFlow.Comtohelpstudentschoosecourses Utilized React.js and D3.js to create a dynamic and interactive user interface that visualizes data Employed Flask API to connect the Selenium back-end to the user interface TwitterCow - Github Link Jan 2023 Developed a website that uses Python Snscrape to scrape Twitter to locate the top tourist destinations Built NLP algorithm to calculate a popularity score and connected it to the front-end using Flask API Customized the popularity score based on users past searches and preferences for improved relevance Implemented React.js front-end to display the top 6 locations related to the users search parameters Connect 4 Online - Github Link Jun 2022 Createdanetwork protocolforanonline multiplayerversionofConnect4usingtheJava Socket library Designed and implemented an interactive user interface using Java.Awt and Java.Awt.Swing Implemented the MVC-Architecture to ensure seamless user experience on multiple screens/interfaces WORK EXPERIENCE Rover Scouter - 6th Richmond Hill Scout Group Sep 2020 - Current Led and coordinated group-wide volunteer events ranging from community service to exploration Awarded the Chief Scouts Award by Scouts Canada for exceptional performance and leadership CooperatedwithotherScouterstodevelopimportantskillssuchasdecision making andcritical thinking Swim Instructor / Supervisor - WD Swim Markham Apr 2022 - Sep 2022 Instructed swimming lessons three times a week at WD, focusing on proper stroke technique and water safety skills for 70+ children from grades K-6, whilst maintaining detailed notes on each students progress Coordinated with fellow instructors to create comprehensive individualized lesson plans to help ensure smooth and consistent delivery of swim instruction, catered towards each individual student Retail Business Executive - Imperiu Sep 2020 - Jun 2021 Orchestrated the companys end-to-end product logistics, ensuring client satisfaction throughout delivery Promoted the company through social media initiatives resulting in the acquisition of 30 new clients Managed payroll at the company with precision and accuracy to ensure timely payment for all employees Instructional Assistant - York Catholic District School Board Sep 2018 - Mar 2020 Utilized effective teaching strategies to enhance native Mandarin proficiency of 30+ kindergarteners Adapted content to ensure that instruction was appropriately paced for young learners in the classroom Providing regulartimely updateswithpeersandsuperiorstoensureclasseswereorganizedandconsistent EDUCATION Bachelor of Computer Science and Business Administration (Double Degree) Expected 2027 School: University of Waterloo GPA: 3.94 / 4.0 Relevant Coursework: Functional (Scheme) and Imperative Programming (C), Data Structures & ADT, Dynamic Memory, Git, Linux, Bash Shell Scripting, Command Line Interface Ontario Secondary School Diploma - St. Augustine Catholic High School 2018 - 2022 Awards: Honor Roll (2018-2022), Economics Award (2021-2022), Music Award (2020-2022) Clubs: Investing Club, Business Club, Computer Science Club, Swim Team, OSAID, Reach To The Top

    """]))