import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ArticleComponent } from './article/article.component';
import { MarkdownModule, MARKED_OPTIONS } from 'ngx-markdown';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BlogComponent } from './blog/blog.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { PublishComponent } from './publish/publish.component';
import { QuillModule } from 'ngx-quill'
import { QuillConfigModule } from 'ngx-quill/config';

@NgModule({ declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        HomeComponent,
        ArticleComponent,
        BlogComponent,
        PublishComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        NgbModule,
        MarkdownModule.forRoot({
            // loader: HttpClient, // optional, only if you use [src] attribute
            markedOptions: {
                provide: MARKED_OPTIONS,
                useValue: {
                    gfm: true,
                    breaks: false,
                    pedantic: false,
                },
            },
        }),
        NgxSpinnerModule,
        QuillModule.forRoot(),
        QuillConfigModule.forRoot({
          modules: {
            syntax: false,
            toolbar:   [
               ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
               ['blockquote', 'code-block'],

               [{ 'header': 1 }, { 'header': 2 }],               // custom button values
               [{ 'list': 'ordered'}, { 'list': 'bullet' }],
               [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
               [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
               [{ 'direction': 'rtl' }],                         // text direction

               [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
               [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

               [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
               [{ 'font': [] }],
               [{ 'align': [] }],

               ['clean'],                                         // remove formatting button

               ['link', 'image', 'video']
           ],

          }
        })
        ], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
