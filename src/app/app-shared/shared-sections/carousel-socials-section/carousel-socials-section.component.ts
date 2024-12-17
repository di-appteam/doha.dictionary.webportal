import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-carousel-socials-section',
  standalone: true,
  imports: [NgFor,NgIf,CarouselModule,NgbCarouselModule,TranslateModule,MatGridListModule],
  templateUrl: './carousel-socials-section.component.html',
  styleUrl: './carousel-socials-section.component.scss'
})
export class CarouselSocialsSectionComponent {

  socialData:any[]=[
    {
      "postUrl": "https://twitter.com/dohainstitute/status/https://x.com/dohainstitute/status/1853710771064385561/",
      "imageUrl": "https://www.dohainstitute.edu.qa/admin/Lists/SocialMedia/Attachments/152380/11815116.jpg",
      "hoverContent": "يقدم مركز اللغات في معهد الدوحة للدراسات العليا ورش تدريبية متنوعة حول اختبار آيلتس (IELTS) من ضمنها: عرض عام لمهارة القراءة في اختبار آيلتس، واستراتيجيات القراءة في الاختبار.\n\nThe Language Center at the DI offers various workshops on the IELTS test. We are offering now IELTS https://t.co/a87BZoc4Al",
      "altText": "11815116",
      "platformIcon": "/Style Library/DI-Styles/images/SocialMediaSymbol/symbol-Twitter-ar.png"
    },
    {
      "postUrl": "https://twitter.com/dohainstitute/status/https://x.com/dohainstitute/status/1857034672682803314/",
      "imageUrl": "https://www.dohainstitute.edu.qa/admin/Lists/SocialMedia/Attachments/152373/12247069",
      "hoverContent": "اليوم التعريفي لبرامج الماجستير والدكتوراه https://t.co/UGZxxNao0X",
      "altText": "12247069",
      "platformIcon": "/Style Library/DI-Styles/images/SocialMediaSymbol/symbol-Twitter-ar.png"
    },
    {
      "postUrl": "https://twitter.com/dohainstitute/status/https://x.com/dohainstitute/status/1856313514911994224/",
      "imageUrl": "https://www.dohainstitute.edu.qa/admin/Lists/SocialMedia/Attachments/152376/12045776.jpg",
      "hoverContent": "زار وفد طلابي من برنامج الماجستير في الدراسات الأمنية النقدية بمعهد الدوحة للدراسات العليا أكاديمية الشرطة في دولة قطر. جاءت الزيارة بهدف التعرف على الجوانب التطبيقية للتحقيق الجنائي والأدلة الجنائية والمؤسسات الإصلاحية والقضائية. https://t.co/JQc8UFFC8A",
      "altText": "12045776",
      "platformIcon": "/Style Library/DI-Styles/images/SocialMediaSymbol/symbol-Twitter-ar.png"
    },
    {
      "postUrl": "https://twitter.com/dohainstitute/status/https://x.com/dohainstitute/status/1853710771064385561/",
      "imageUrl": "https://www.dohainstitute.edu.qa/admin/Lists/SocialMedia/Attachments/152380/11815116.jpg",
      "hoverContent": "يقدم مركز اللغات في معهد الدوحة للدراسات العليا ورش تدريبية متنوعة حول اختبار آيلتس (IELTS) من ضمنها: عرض عام لمهارة القراءة في اختبار آيلتس، واستراتيجيات القراءة في الاختبار.\n\nThe Language Center at the DI offers various workshops on the IELTS test. We are offering now IELTS https://t.co/a87BZoc4Al",
      "altText": "11815116",
      "platformIcon": "/Style Library/DI-Styles/images/SocialMediaSymbol/symbol-Twitter-ar.png"
    },
    {
      "postUrl": "https://twitter.com/dohainstitute/status/https://x.com/dohainstitute/status/1857034672682803314/",
      "imageUrl": "https://www.dohainstitute.edu.qa/admin/Lists/SocialMedia/Attachments/152373/12247069",
      "hoverContent": "اليوم التعريفي لبرامج الماجستير والدكتوراه https://t.co/UGZxxNao0X",
      "altText": "12247069",
      "platformIcon": "/Style Library/DI-Styles/images/SocialMediaSymbol/symbol-Twitter-ar.png"
    },
    {
      "postUrl": "https://twitter.com/dohainstitute/status/https://x.com/dohainstitute/status/1856313514911994224/",
      "imageUrl": "https://www.dohainstitute.edu.qa/admin/Lists/SocialMedia/Attachments/152376/12045776.jpg",
      "hoverContent": "زار وفد طلابي من برنامج الماجستير في الدراسات الأمنية النقدية بمعهد الدوحة للدراسات العليا أكاديمية الشرطة في دولة قطر. جاءت الزيارة بهدف التعرف على الجوانب التطبيقية للتحقيق الجنائي والأدلة الجنائية والمؤسسات الإصلاحية والقضائية. https://t.co/JQc8UFFC8A",
      "altText": "12045776",
      "platformIcon": "/Style Library/DI-Styles/images/SocialMediaSymbol/symbol-Twitter-ar.png"
    }
    // Additional entries can be added here...
  ];

  public carouselOptions: OwlOptions = {
    items: 1,
    dots: true,
    loop: false,
    rtl: true,
    nav: false,
    rewind:true,
    mouseDrag: true,
    dotsData:false,
    responsive: {
      991: {
        items: 4,
        loop: false,
        mouseDrag: false,
        dots: true,
      }
    }

  };

}
