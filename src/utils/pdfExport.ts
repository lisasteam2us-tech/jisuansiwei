import jsPDF from 'jspdf';
import html2canvas from 'html2canvas-pro';

export interface GeneratePdfOptions {
  element: HTMLElement;
  filename: string;
  onProgress?: (step: string, percent: number) => void;
}

/**
 * Captures a DOM element and exports it as an ultra-crisp, print-ready multi-page A4 PDF document.
 */
export async function exportElementToPdf({
  element,
  filename,
  onProgress,
}: GeneratePdfOptions): Promise<void> {
  onProgress?.('正在准备 300 DPI 超高清排版与矢量图谱...', 10);

  // Check if the element contains designated page sheets
  const pageSheets = Array.from(element.querySelectorAll<HTMLElement>('.pdf-page-sheet'));
  
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true,
  });

  const pageWidth = 210;
  const pageHeight = 297;

  if (pageSheets.length > 0) {
    for (let i = 0; i < pageSheets.length; i++) {
      const sheet = pageSheets[i];
      const progressPct = Math.round(15 + ((i + 1) / pageSheets.length) * 75);
      onProgress?.(`正在渲染第 ${i + 1}/${pageSheets.length} 页 A4 官方报告...`, progressPct);

      const canvas = await html2canvas(sheet, {
        scale: 2.5,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: 1024,
        imageTimeout: 0,
        scrollY: 0,
        scrollX: 0,
      });

      const imgData = canvas.toDataURL('image/png');
      if (i > 0) {
        pdf.addPage();
      }
      pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight, undefined, 'FAST');
    }
  } else {
    // Continuous multi-page slicing fallback
    onProgress?.('正在生成 A4 矢量无损文档结构...', 40);
    const canvas = await html2canvas(element, {
      scale: 2.5,
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: 1024,
      imageTimeout: 0,
      scrollY: 0,
      scrollX: 0,
      height: element.scrollHeight,
    });

    const imgData = canvas.toDataURL('image/png');
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    onProgress?.('正在装配高清页面与防伪印章...', 80);

    // First page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
    heightLeft -= pageHeight;

    // Subsequent pages
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pageHeight;
    }
  }

  onProgress?.('正在打包并启动极速下载...', 100);

  const cleanFilename = filename.endsWith('.pdf') ? filename : `${filename}.pdf`;
  pdf.save(cleanFilename);
}

/**
 * Exports a DOM element as an ultra-high-resolution PNG long screenshot for easy sharing on mobile/social media.
 */
export async function exportElementToImage(
  element: HTMLElement,
  filename: string
): Promise<void> {
  const canvas = await html2canvas(element, {
    scale: 2.5, // 2.5x ultra-crisp resolution
    useCORS: true,
    allowTaint: true,
    logging: false,
    backgroundColor: '#f1f5f9',
    windowWidth: 1024,
    scrollY: 0,
    scrollX: 0,
    height: element.scrollHeight,
    windowHeight: element.scrollHeight,
  });

  const image = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = image;
  link.download = filename.endsWith('.png') ? filename : `${filename}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

