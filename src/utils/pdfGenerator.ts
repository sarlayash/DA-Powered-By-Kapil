import { jsPDF } from 'jspdf';
import { Badge, UserProfile } from '../types';

/**
 * Generates an Ultra-HD Professional PNG Certificate
 */
export async function downloadCertificatePNG(user: UserProfile, completionPercentage: number): Promise<void> {
  const width = 2400;
  const height = 1600;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Background deep charcoal obsidian gradient
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, '#090A0F');
  bgGrad.addColorStop(0.5, '#12141D');
  bgGrad.addColorStop(1, '#090A0F');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Outer Gold Border (6px)
  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 14;
  ctx.strokeRect(60, 60, width - 120, height - 120);

  // Inner hairline gold frame
  ctx.strokeStyle = '#8C6D14';
  ctx.lineWidth = 3;
  ctx.strokeRect(85, 85, width - 170, height - 170);

  // Ornate Corner Accents
  const drawCorner = (x: number, y: number, angle: number) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.strokeStyle = '#FFDF73';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(0, 40);
    ctx.lineTo(0, 0);
    ctx.lineTo(40, 0);
    ctx.stroke();
    // Inner diamond accent
    ctx.fillStyle = '#D4AF37';
    ctx.beginPath();
    ctx.arc(15, 15, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };
  drawCorner(100, 100, 0);
  drawCorner(width - 100, 100, Math.PI / 2);
  drawCorner(width - 100, height - 100, Math.PI);
  drawCorner(100, height - 100, -Math.PI / 2);

  // Institution Header
  ctx.textAlign = 'center';
  ctx.fillStyle = '#D4AF37';
  ctx.font = '600 36px "Cinzel", Georgia, serif';
  ctx.letterSpacing = '6px';
  ctx.fillText('MASTER DATA ANALYTICS WITH KAPIL', width / 2, 220);

  // Subtitle
  ctx.fillStyle = '#A0AEC0';
  ctx.font = '400 24px "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '4px';
  ctx.fillText('EXECUTIVE FELLOWSHIP PROGRAM & CURRICULUM BOARD', width / 2, 270);

  // Decorative divider
  const divGrad = ctx.createLinearGradient(width / 2 - 300, 0, width / 2 + 300, 0);
  divGrad.addColorStop(0, 'rgba(212, 175, 55, 0)');
  divGrad.addColorStop(0.5, 'rgba(212, 175, 55, 0.9)');
  divGrad.addColorStop(1, 'rgba(212, 175, 55, 0)');
  ctx.strokeStyle = divGrad;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(width / 2 - 350, 310);
  ctx.lineTo(width / 2 + 350, 310);
  ctx.stroke();

  // Certificate Title
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 68px "Cinzel", Georgia, serif';
  ctx.letterSpacing = '2px';
  ctx.fillText('CERTIFICATE OF MASTERY', width / 2, 420);

  // Presentation text
  ctx.fillStyle = '#E2E8F0';
  ctx.font = '300 32px "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '2px';
  ctx.fillText('THIS PRESTIGIOUS CREDENTIAL IS PROUDLY CONFERRED UPON', width / 2, 510);

  // Recipient Name (Highlight Gold)
  const nameGrad = ctx.createLinearGradient(width / 2 - 400, 0, width / 2 + 400, 0);
  nameGrad.addColorStop(0, '#FFE899');
  nameGrad.addColorStop(0.5, '#D4AF37');
  nameGrad.addColorStop(1, '#FFE899');
  ctx.fillStyle = nameGrad;
  ctx.font = '700 84px "Cinzel", Georgia, serif';
  ctx.letterSpacing = '3px';
  ctx.fillText(user.name.toUpperCase(), width / 2, 630);

  // Underline for name
  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(width / 2 - 450, 665);
  ctx.lineTo(width / 2 + 450, 665);
  ctx.stroke();

  // Achievement Description
  ctx.fillStyle = '#CBD5E1';
  ctx.font = '400 30px "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '1px';
  ctx.fillText('For successfully demonstrating industrial competence and rigor across the comprehensive', width / 2, 750);

  ctx.fillStyle = '#F8FAFC';
  ctx.font = '700 38px "Cinzel", Georgia, serif';
  ctx.letterSpacing = '1.5px';
  ctx.fillText('87-Module Curriculum in AI-Assisted Analytics, ML, GenAI & Enterprise Data Lake', width / 2, 815);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '400 26px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(`Completed with 10% Foundational Theory and 90% Industrial Hands-On Verification (${completionPercentage}% verified)`, width / 2, 875);

  // Ornate Gold Medallion Seal in center bottom
  const sealX = width / 2;
  const sealY = 1120;
  const sealRadius = 110;

  // Outer seal scalloped/circle
  ctx.fillStyle = '#D4AF37';
  ctx.beginPath();
  ctx.arc(sealX, sealY, sealRadius + 10, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#141722';
  ctx.beginPath();
  ctx.arc(sealX, sealY, sealRadius - 2, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = '#FFDF73';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(sealX, sealY, sealRadius - 14, 0, Math.PI * 2);
  ctx.stroke();

  // Seal inner star & text
  ctx.fillStyle = '#D4AF37';
  ctx.font = '800 20px "Cinzel", Georgia, serif';
  ctx.fillText('★ OFFICIAL SEAL ★', sealX, sealY - 45);
  ctx.font = '900 32px "Cinzel", Georgia, serif';
  ctx.fillText('KAPIL', sealX, sealY + 2);
  ctx.font = '700 16px "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '3px';
  ctx.fillText('EXCELLENCE', sealX, sealY + 32);
  ctx.font = '600 14px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('2026', sealX, sealY + 54);

  // Signatures Zone (Left: Program Director, Right: Head of AI & Analytics)
  const leftSigX = 480;
  const rightSigX = width - 480;
  const sigY = 1320;

  // Left Signature
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(leftSigX - 180, sigY);
  ctx.lineTo(leftSigX + 180, sigY);
  ctx.stroke();

  ctx.fillStyle = '#E2E8F0';
  ctx.font = '700 28px "Cinzel", Georgia, serif';
  ctx.fillText('Kapil Narula', leftSigX, sigY - 20);
  ctx.fillStyle = '#94A3B8';
  ctx.font = '400 22px "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '1px';
  ctx.fillText('Program Lead & Chief AI Architect', leftSigX, sigY + 38);
  ctx.font = '400 18px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Master Data Analytics With Kapil', leftSigX, sigY + 68);

  // Right Signature
  ctx.beginPath();
  ctx.moveTo(rightSigX - 180, sigY);
  ctx.lineTo(rightSigX + 180, sigY);
  ctx.stroke();

  ctx.fillStyle = '#E2E8F0';
  ctx.font = '700 28px "Cinzel", Georgia, serif';
  ctx.fillText('Dr. Marcus Vance, Ph.D.', rightSigX, sigY - 20);
  ctx.fillStyle = '#94A3B8';
  ctx.font = '400 22px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Director of Enterprise Curriculum', rightSigX, sigY + 38);
  ctx.font = '400 18px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Global Data Science Council', rightSigX, sigY + 68);

  // Footer Metadata and Mandatory Copyright
  ctx.fillStyle = '#D4AF37';
  ctx.font = '600 22px "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '1px';
  ctx.fillText(`CREDENTIAL ID: KAPIL-CERT-${user.id.slice(-6).toUpperCase()}-2026 · VERIFIED RECORD`, width / 2, 1470);

  ctx.fillStyle = '#64748B';
  ctx.font = '400 20px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('© 2026 Powered By Kapil. All rights reserved. Registered under Master Data Analytics With Kapil Framework.', width / 2, 1515);

  // Download Trigger
  const dataUrl = canvas.toDataURL('image/png', 1.0);
  const link = document.createElement('a');
  link.download = `Master_Data_Analytics_Certificate_${user.name.replace(/\s+/g, '_')}.png`;
  link.href = dataUrl;
  link.click();
}

/**
 * Generates an Executive A4 Landscape PDF Certificate
 */
export function downloadCertificatePDF(user: UserProfile, completionPercentage: number): void {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth(); // 297mm
  const pageHeight = doc.internal.pageSize.getHeight(); // 210mm

  // Background deep onyx
  doc.setFillColor(9, 10, 15);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Outer Gold Border
  doc.setDrawColor(212, 175, 55); // #D4AF37
  doc.setLineWidth(2.5);
  doc.rect(8, 8, pageWidth - 16, pageHeight - 16);

  // Inner hairline border
  doc.setDrawColor(140, 109, 20);
  doc.setLineWidth(0.8);
  doc.rect(12, 12, pageWidth - 24, pageHeight - 24);

  // Institute Header
  doc.setFont('times', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(212, 175, 55);
  doc.text('MASTER DATA ANALYTICS WITH KAPIL', pageWidth / 2, 30, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(160, 174, 192);
  doc.text('EXECUTIVE FELLOWSHIP PROGRAM & CURRICULUM BOARD', pageWidth / 2, 36, { align: 'center' });

  // Divider
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(0.5);
  doc.line(pageWidth / 2 - 50, 40, pageWidth / 2 + 50, 40);

  // Certificate Title
  doc.setFont('times', 'bold');
  doc.setFontSize(26);
  doc.setTextColor(255, 255, 255);
  doc.text('CERTIFICATE OF MASTERY', pageWidth / 2, 54, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(226, 232, 240);
  doc.text('THIS PRESTIGIOUS CREDENTIAL IS PROUDLY CONFERRED UPON', pageWidth / 2, 65, { align: 'center' });

  // Recipient Name
  doc.setFont('times', 'bold');
  doc.setFontSize(30);
  doc.setTextColor(212, 175, 55);
  doc.text(user.name.toUpperCase(), pageWidth / 2, 80, { align: 'center' });

  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(0.4);
  doc.line(pageWidth / 2 - 60, 84, pageWidth / 2 + 60, 84);

  // Statement
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(203, 213, 225);
  doc.text('For successfully demonstrating industrial competence and rigor across the comprehensive', pageWidth / 2, 95, { align: 'center' });

  doc.setFont('times', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(255, 255, 255);
  doc.text('87-Module Curriculum in AI-Assisted Analytics, ML, GenAI & Enterprise Data Lake', pageWidth / 2, 103, { align: 'center' });

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9.5);
  doc.setTextColor(148, 163, 184);
  doc.text(`Completed with 10% Foundational Theory and 90% Industrial Hands-On Verification (${completionPercentage}% verified)`, pageWidth / 2, 111, { align: 'center' });

  // Official Gold Seal Circle
  const sealY = 138;
  doc.setFillColor(20, 23, 34);
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(1.5);
  doc.circle(pageWidth / 2, sealY, 14, 'FD');

  doc.setFont('times', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(212, 175, 55);
  doc.text('KAPIL', pageWidth / 2, sealY - 1, { align: 'center' });
  doc.setFontSize(6);
  doc.text('SEAL OF MASTERY', pageWidth / 2, sealY + 4, { align: 'center' });
  doc.text('★ 2026 ★', pageWidth / 2, sealY + 8, { align: 'center' });

  // Signatures
  const leftX = 65;
  const rightX = pageWidth - 65;
  const sigLineY = 168;

  // Program Lead
  doc.setDrawColor(100, 116, 139);
  doc.setLineWidth(0.4);
  doc.line(leftX - 25, sigLineY, leftX + 25, sigLineY);

  doc.setFont('times', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(226, 232, 240);
  doc.text('Kapil Narula', leftX, sigLineY - 3, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text('Program Lead & Chief AI Architect', leftX, sigLineY + 5, { align: 'center' });
  doc.text('Master Data Analytics With Kapil', leftX, sigLineY + 9, { align: 'center' });

  // Academic Director
  doc.line(rightX - 25, sigLineY, rightX + 25, sigLineY);

  doc.setFont('times', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(226, 232, 240);
  doc.text('Dr. Marcus Vance, Ph.D.', rightX, sigLineY - 3, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text('Director of Enterprise Curriculum', rightX, sigLineY + 5, { align: 'center' });
  doc.text('Global Data Science Council', rightX, sigLineY + 9, { align: 'center' });

  // Footer & Mandatory Copyright
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(212, 175, 55);
  doc.text(`CREDENTIAL ID: KAPIL-CERT-${user.id.slice(-6).toUpperCase()}-2026 · VERIFIED`, pageWidth / 2, 192, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('© 2026 Powered By Kapil. All rights reserved. Issued under Kapil Analytics Curriculum Framework.', pageWidth / 2, 197, { align: 'center' });

  doc.save(`Kapil_Analytics_Certificate_${user.name.replace(/\s+/g, '_')}.pdf`);
}

/**
 * Generates an 800x800 High-Res PNG Badge
 */
export async function downloadBadgePNG(badge: Badge, userName: string): Promise<void> {
  const size = 800;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const cx = size / 2;
  const cy = size / 2;

  // Background deep circle
  ctx.fillStyle = '#090A0F';
  ctx.fillRect(0, 0, size, size);

  // Outer Medallion Cog / Star points
  ctx.save();
  ctx.translate(cx, cy);
  const numPoints = 24;
  const outerR = 340;
  const innerR = 310;
  ctx.fillStyle = '#B89225';
  ctx.beginPath();
  for (let i = 0; i < numPoints * 2; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const a = (i * Math.PI) / numPoints;
    ctx.lineTo(r * Math.cos(a), r * Math.sin(a));
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // Shiny gold ring
  const ringGrad = ctx.createLinearGradient(cx - 300, cy - 300, cx + 300, cy + 300);
  ringGrad.addColorStop(0, '#FFE899');
  ringGrad.addColorStop(0.5, '#D4AF37');
  ringGrad.addColorStop(1, '#8C6D14');

  ctx.fillStyle = ringGrad;
  ctx.beginPath();
  ctx.arc(cx, cy, 290, 0, Math.PI * 2);
  ctx.fill();

  // Inner Obsidian Disc
  ctx.fillStyle = '#0F121C';
  ctx.beginPath();
  ctx.arc(cx, cy, 260, 0, Math.PI * 2);
  ctx.fill();

  // Fine Gold Track
  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(cx, cy, 245, 0, Math.PI * 2);
  ctx.stroke();

  // Stars
  ctx.textAlign = 'center';
  ctx.fillStyle = '#FFDF73';
  ctx.font = '24px sans-serif';
  ctx.fillText('★  ★  ★', cx, cy - 170);

  // Badge Category
  ctx.fillStyle = '#D4AF37';
  ctx.font = '600 20px "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '3px';
  ctx.fillText(badge.category.toUpperCase(), cx, cy - 130);

  // Badge Title (Wrapped if necessary)
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 32px "Cinzel", Georgia, serif';
  ctx.letterSpacing = '1px';
  
  const words = badge.title.split(' ');
  if (words.length > 2) {
    ctx.fillText(words.slice(0, 2).join(' '), cx, cy - 40);
    ctx.fillText(words.slice(2).join(' '), cx, cy + 5);
  } else {
    ctx.fillText(badge.title, cx, cy - 20);
  }

  // Gold Tier Banner
  ctx.fillStyle = '#D4AF37';
  ctx.font = '700 22px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(`[ ${badge.goldLevel.toUpperCase()} SPECIALIST ]`, cx, cy + 70);

  // Recipient Name
  ctx.fillStyle = '#CBD5E1';
  ctx.font = '500 22px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(`Conferred To: ${userName}`, cx, cy + 120);

  // Mandatory Copyright & Branding
  ctx.fillStyle = '#94A3B8';
  ctx.font = '400 18px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Powered By Kapil • 2026', cx, cy + 175);

  const dataUrl = canvas.toDataURL('image/png', 1.0);
  const link = document.createElement('a');
  link.download = `Kapil_Badge_${badge.id}.png`;
  link.href = dataUrl;
  link.click();
}

/**
 * Generates a PDF Badge Card
 */
export function downloadBadgePDF(badge: Badge, userName: string): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: [140, 180] // Card size
  });

  const w = doc.internal.pageSize.getWidth();
  const h = doc.internal.pageSize.getHeight();

  // Background
  doc.setFillColor(9, 10, 15);
  doc.rect(0, 0, w, h, 'F');

  // Gold frame
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(1.8);
  doc.rect(6, 6, w - 12, h - 12);

  // Inner hairline
  doc.setDrawColor(140, 109, 20);
  doc.setLineWidth(0.6);
  doc.rect(9, 9, w - 18, h - 18);

  // Header
  doc.setFont('times', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(212, 175, 55);
  doc.text('MASTER DATA ANALYTICS WITH KAPIL', w / 2, 22, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(160, 174, 192);
  doc.text('OFFICIAL COMPETENCY BADGE', w / 2, 27, { align: 'center' });

  // Central Medallion Graphic in PDF
  doc.setFillColor(20, 23, 34);
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(1.2);
  doc.circle(w / 2, 60, 24, 'FD');

  doc.setFont('times', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(255, 223, 115);
  doc.text('★ ★ ★', w / 2, 53, { align: 'center' });
  doc.setFontSize(11);
  doc.setTextColor(255, 255, 255);
  doc.text(badge.goldLevel.toUpperCase(), w / 2, 61, { align: 'center' });
  doc.setFontSize(7);
  doc.setTextColor(212, 175, 55);
  doc.text('LEVEL', w / 2, 67, { align: 'center' });

  // Badge Title
  doc.setFont('times', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.text(badge.title, w / 2, 96, { align: 'center', maxWidth: w - 30 });

  // Category
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(212, 175, 55);
  doc.text(`Track: ${badge.category}`, w / 2, 106, { align: 'center' });

  // Description
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(203, 213, 225);
  doc.text(badge.description, w / 2, 116, { align: 'center', maxWidth: w - 32 });

  // Recipient
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(0.4);
  doc.line(w / 2 - 30, 134, w / 2 + 30, 134);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.text(userName, w / 2, 142, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text('Verified Curriculum Candidate', w / 2, 148, { align: 'center' });

  // Mandatory Footer Copyright
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text('© 2026 Powered By Kapil. All rights reserved.', w / 2, 165, { align: 'center' });

  doc.save(`Kapil_Badge_${badge.id}.pdf`);
}
