// Scholar's Ledger receipts: client-side PDFs are generated only from completed local or remote mutation responses.
import { jsPDF } from "jspdf";


const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});


function line(doc, y) {
  doc.setDrawColor(217, 204, 189);
  doc.line(18, y, 192, y);
}


function header(doc, title, reference, settings) {
  doc.setFillColor(22, 18, 15);
  doc.rect(0, 0, 210, 42, "F");
  doc.setTextColor(255, 253, 249);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text(settings.libraryName || "LIBRA CORE", 18, 19);
  doc.setFontSize(8);
  doc.text("CATALOGUE OPERATIONS / RECEIPT", 18, 27);
  doc.setFontSize(12);
  doc.text(title, 18, 35);
  doc.setFontSize(8);
  doc.text(`REF. ${settings.receiptPrefix || "LC"}-${reference}`, 192, 35, {
    align: "right",
  });
  doc.setTextColor(51, 41, 32);
}

function footer(doc) {
  doc.setDrawColor(36, 87, 214);
  doc.line(18, 269, 192, 269);
  doc.setTextColor(110, 95, 80);
  doc.setFontSize(8);
  doc.text("Generated from the LibraCore ledger", 18, 276);
  doc.text("Please retain this document for your records.", 192, 276, {
    align: "right",
  });
}

export function downloadRentalReceipt({ rental, library, settings }) {
  const doc = new jsPDF();
  header(doc, "Rental receipt", rental.id, settings);
  doc.setFontSize(10);
  doc.setTextColor(110, 95, 80);
  doc.text("ISSUED TO", 18, 61);
  doc.setTextColor(48, 37, 29);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.text(rental.memberName, 18, 70);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(110, 95, 80);
  doc.text(
    rental.memberEmail || "Member contact recorded at the circulation desk",
    18,
    77
  );
  line(doc, 86);
  const rows = [
    ["Lending branch", library?.name || "Library branch"],
    ["Book issued", rental.bookTitle],
    ["Issued on", rental.rentedDate],
    ["Due date", rental.dueDate],
    ["Loan status", rental.status],
    ["Renewals", String(rental.renewalCount || 0)],
  ];
  rows.forEach(([label, value], index) => {
    const y = 101 + index * 17;
    doc.setTextColor(126, 105, 88);
    doc.setFontSize(9);
    doc.text(label.toUpperCase(), 18, y);
    doc.setTextColor(48, 37, 29);
    doc.setFontSize(11);
    doc.text(String(value), 76, y);
    line(doc, y + 7);
  });
  footer(doc);
  doc.save(`rental-receipt-${rental.id}.pdf`);
}

export function downloadTransactionReceipt({ transaction, library, settings }) {
  const doc = new jsPDF();
  header(doc, "Financial entry receipt", transaction.id, settings);
  doc.setFontSize(10);
  doc.setTextColor(110, 95, 80);
  doc.text("LEDGER ENTRY", 18, 61);
  doc.setTextColor(48, 37, 29);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.text(transaction.description, 18, 70, { maxWidth: 168 });
  doc.setFont("helvetica", "normal");
  line(doc, 86);
  const rows = [
    ["Branch", library?.name || "Library branch"],
    ["Direction", transaction.type],
    ["Category", transaction.category],
    ["Entry date", transaction.date],
    ["Amount", usd.format(transaction.amount)],
  ];
  rows.forEach(([label, value], index) => {
    const y = 101 + index * 19;
    doc.setTextColor(126, 105, 88);
    doc.setFontSize(9);
    doc.text(label.toUpperCase(), 18, y);
    doc.setTextColor(48, 37, 29);
    doc.setFontSize(index === 4 ? 14 : 11);
    doc.setFont("helvetica", index === 4 ? "bold" : "normal");
    doc.text(String(value), 76, y);
    line(doc, y + 8);
  });
  footer(doc);
  doc.save(`ledger-receipt-${transaction.id}.pdf`);
}
