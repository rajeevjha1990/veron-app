import { AlertController } from '@ionic/angular';
import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SHARED_IONIC_MODULES } from 'src/app/shared/shared.ionic';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-support',
  templateUrl: './support.page.html',
  styleUrls: ['./support.page.scss'],
  standalone: true,
  imports: [...SHARED_IONIC_MODULES, CommonModule, FormsModule]
})
export class SupportPage implements OnInit, AfterViewChecked {
  activeTab: string = 'new';
  support: any = {};
  tickets: any = [];
  supportHistory: any = [];

  @ViewChild('chatWindow') private chatWindow!: ElementRef;

  constructor(
    private userServ: UserService,
    private alertCtrl: AlertController,
    private router: Router,
  ) { }

  async ngOnInit() {
    // 1. Get generated tickets
    this.tickets = await this.userServ.generatedTickets();

    // 2. Load conversations for each ticket
    for (let tkt of this.tickets) {
      const resp = await this.userServ.getTicketConversation(tkt.tkt_no);
      if (resp && resp.length > 0) {
        this.supportHistory.push({
          tkt_no: tkt.tkt_no,
          subject: tkt.subject,
          conversation: resp.map((c: any) => ({
            reply_by_ref: c.reply_by_ref,   // admin / user
            reply_msg: c.reply_msg,
            res_date: c.res_date
          })),
          replyText: ''  // model for textarea
        });
      }
    }
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    try {
      if (this.chatWindow) {
        this.chatWindow.nativeElement.scrollTop = this.chatWindow.nativeElement.scrollHeight;
      }
    } catch (err) { }
  }

  // 3. Submit new support ticket
  async submitSupport() {
    if (!this.support.subject || !this.support.query) {
      const alert = await this.alertCtrl.create({
        header: 'Form Incomplete',
        message: 'Please fill out all required fields.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const resp = await this.userServ.raisedYourTicket(this.support);
    if (resp && resp.status === 200) {
      this.router.navigate(['/support']);
    }
  }

  // 4. Send reply
  async sendReply(ticket: any) {
    if (!ticket.replyText || ticket.replyText.trim() === '') return;

    const replyData = {
      tkt_no: ticket.tkt_no,
      reply_msg: ticket.replyText,
      reply_by_ref: 'user'
    };

    const resp = await this.userServ.replyToTicket(replyData);

    if (resp && resp.status) {
      // Push reply instantly to UI
      ticket.conversation.push({
        reply_by_ref: 'user',
        reply_msg: ticket.replyText,
        res_date: new Date()
      });
      ticket.replyText = '';
      this.scrollToBottom();
    }
  }
}
