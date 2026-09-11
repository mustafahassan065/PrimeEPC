import os
import sys
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter, A4
from reportlab.lib.units import inch
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.pdfgen import canvas

# Colors matching Prime EPC branding
PRIMARY_GREEN = colors.HexColor('#016837')
ACCENT_GREEN = colors.HexColor('#80C531')
DARK_SLATE = colors.HexColor('#1E293B')
TEXT_DARK = colors.HexColor('#282828')
BG_LIGHT = colors.HexColor('#F8FAFC')
BORDER_COLOR = colors.HexColor('#E2E8F0')
WHITE = colors.HexColor('#FFFFFF')
ALERT_RED = colors.HexColor('#C0392B')

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super(NumberedCanvas, self).__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super(NumberedCanvas, self).showPage()
        super(NumberedCanvas, self).save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        
        # Header (pages > 1)
        if self._pageNumber > 1:
            self.setFont("Helvetica-Bold", 8)
            self.setFillColor(PRIMARY_GREEN)
            self.drawString(36, 810, "PRIME EPC & DESIGN CONSULTANTS")
            self.setFont("Helvetica", 8)
            self.setFillColor(colors.HexColor('#64748B'))
            self.drawRightString(559, 810, "Google Ads Search Campaign & Entity Strategy")
            self.setStrokeColor(BORDER_COLOR)
            self.setLineWidth(0.75)
            self.line(36, 802, 559, 802)

        # Footer (all pages)
        self.setStrokeColor(BORDER_COLOR)
        self.setLineWidth(0.75)
        self.line(36, 42, 559, 42)
        
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor('#64748B'))
        self.drawString(36, 28, "https://www.primeepcdesign.co.uk | Target: Greater Manchester & 50-Mile Radius")
        page_text = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(559, 28, page_text)
        
        self.restoreState()

def build_pdf(filename="PrimeEPC_Google_Ads_Keywords_Strategy.pdf"):
    doc = SimpleDocTemplate(
        filename,
        pagesize=A4,
        leftMargin=36,
        rightMargin=36,
        topMargin=54,
        bottomMargin=54
    )

    styles = getSampleStyleSheet()
    
    # Custom styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=22,
        leading=26,
        textColor=PRIMARY_GREEN,
        spaceAfter=4
    )
    
    subtitle_style = ParagraphStyle(
        'DocSubTitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=11,
        leading=15,
        textColor=colors.HexColor('#475569'),
        spaceAfter=15
    )

    h1_style = ParagraphStyle(
        'Heading1_Custom',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=14,
        leading=18,
        textColor=PRIMARY_GREEN,
        spaceBefore=12,
        spaceAfter=6,
        keepWithNext=True
    )

    h2_style = ParagraphStyle(
        'Heading2_Custom',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=14,
        textColor=DARK_SLATE,
        spaceBefore=8,
        spaceAfter=4,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'Body_Custom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=TEXT_DARK,
        spaceAfter=6
    )

    badge_style = ParagraphStyle(
        'Badge',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=10,
        textColor=WHITE
    )

    table_header_style = ParagraphStyle(
        'TableHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11,
        textColor=WHITE
    )

    table_cell_style = ParagraphStyle(
        'TableCell',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=10.5,
        textColor=TEXT_DARK
    )

    table_cell_bold = ParagraphStyle(
        'TableCellBold',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=10.5,
        textColor=DARK_SLATE
    )

    table_cell_url = ParagraphStyle(
        'TableCellUrl',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=7.5,
        leading=10,
        textColor=colors.HexColor('#0284C7')
    )

    story = []

    # Title Banner Block
    banner_data = [
        [
            Paragraph("<b>PRIME EPC &amp; DESIGN CONSULTANTS</b><br/><font size=8 color='#64748B'>GOOGLE ADS KEYWORD &amp; ENTITY EXTRACTION SPECIALIST DOSSIER</font>", table_cell_bold),
            Paragraph("<font color='#016837'><b>Target Geo:</b> Greater Manchester (50-Mile Radius)<br/><b>Domain:</b> primeepcdesign.co.uk</font>", table_cell_style)
        ]
    ]
    t_banner = Table(banner_data, colWidths=[320, 203])
    t_banner.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), BG_LIGHT),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#CBD5E1')),
        ('PADDING', (0,0), (-1,-1), 8),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(t_banner)
    story.append(Spacer(1, 10))

    story.append(Paragraph("Google Ads Search Strategy &amp; Entity Keyword Blueprint", title_style))
    story.append(Paragraph(
        "Commercial keyword architecture, high-intent transactional search terms, 50-mile radius geo-modifiers, match-type formatting, landing page mapping, and negative keyword exclusions for maximum Google Ads Quality Score.",
        subtitle_style
    ))
    story.append(HRFlowable(width="100%", thickness=1.5, color=PRIMARY_GREEN, spaceBefore=0, spaceAfter=12))

    # Executive Overview
    overview_text = (
        "<b>Strategy Overview:</b> This campaign is engineered to capture high-intent property owners, landlords, estate agents, and commercial managers looking for accredited EPCs, EICRs, and CAD drafting services across Greater Manchester and surrounding towns (Bolton, Stockport, Salford, Oldham, Wigan, Rochdale, Bury, Didsbury, Altrincham, Warrington). Each ad group is anchored by fixed pricing and strict landing page relevance to achieve >8/10 Quality Scores."
    )
    story.append(Paragraph(overview_text, body_style))
    story.append(Spacer(1, 8))

    # Helper function for generating ad group tables
    def create_ad_group_table(rows_data):
        # header
        table_data = [[
            Paragraph("Intent / Cluster", table_header_style),
            Paragraph("Match Type", table_header_style),
            Paragraph("Keyword Search Term", table_header_style),
            Paragraph("Designated Landing Page URL", table_header_style)
        ]]
        for cluster, mtype, kw, url in rows_data:
            table_data.append([
                Paragraph(cluster, table_cell_bold),
                Paragraph(mtype, table_cell_style),
                Paragraph(f"<code>{kw}</code>", table_cell_style),
                Paragraph(url, table_cell_url)
            ])
        
        t = Table(table_data, colWidths=[105, 75, 175, 168])
        t.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), PRIMARY_GREEN),
            ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
            ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
            ('TOPPADDING', (0, 0), (-1, -1), 4),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
            ('LEFTPADDING', (0, 0), (-1, -1), 5),
            ('RIGHTPADDING', (0, 0), (-1, -1), 5),
            ('GRID', (0, 0), (-1, -1), 0.5, BORDER_COLOR),
            ('ROWBACKGROUNDS', (0, 1), (-1, -1), [WHITE, BG_LIGHT]),
        ]))
        return t

    # 1. Domestic EPC
    story.append(Paragraph("1. CAMPAIGN BUCKET: Domestic EPC (Fixed Fee £50 – £55)", h1_style))
    story.append(Paragraph("<b>Landing Page:</b> <code>https://www.primeepcdesign.co.uk/booking</code> | <b>Baseline Cost:</b> £50.00 / £55.00 | <b>Turnaround:</b> 24–48h", body_style))
    
    domestic_keywords = [
        ("High-Intent", "Phrase Match", '"book epc manchester"', "primeepcdesign.co.uk/booking"),
        ("High-Intent", "Exact Match", "[book epc manchester]", "primeepcdesign.co.uk/booking"),
        ("High-Intent", "Phrase Match", '"cheap epc certificate manchester"', "primeepcdesign.co.uk/booking"),
        ("High-Intent", "Exact Match", "[cheap epc certificate manchester]", "primeepcdesign.co.uk/booking"),
        ("High-Intent", "Phrase Match", '"epc fixed fee £55"', "primeepcdesign.co.uk/booking"),
        ("High-Intent", "Exact Match", "[epc fixed fee 55]", "primeepcdesign.co.uk/booking"),
        ("High-Intent", "Phrase Match", '"fast epc certificate 24 hours"', "primeepcdesign.co.uk/booking"),
        ("Landlord / MEES", "Phrase Match", '"landlord epc manchester"', "primeepcdesign.co.uk/booking"),
        ("Landlord / MEES", "Exact Match", "[landlord epc manchester]", "primeepcdesign.co.uk/booking"),
        ("Landlord / MEES", "Phrase Match", '"mees compliance certificate manchester"', "primeepcdesign.co.uk/booking"),
        ("Landlord / MEES", "Phrase Match", '"epc for selling house manchester"', "primeepcdesign.co.uk/booking"),
        ("Landlord / MEES", "Phrase Match", '"rental property epc certificate"', "primeepcdesign.co.uk/booking"),
        ("Geo-Targeted", "Phrase Match", '"epc certificate manchester"', "primeepcdesign.co.uk/booking"),
        ("Geo-Targeted", "Exact Match", "[epc certificate manchester]", "primeepcdesign.co.uk/booking"),
        ("Geo-Targeted", "Phrase Match", '"epc bolton"', "primeepcdesign.co.uk/booking"),
        ("Geo-Targeted", "Exact Match", "[epc bolton]", "primeepcdesign.co.uk/booking"),
        ("Geo-Targeted", "Phrase Match", '"epc certificate stockport"', "primeepcdesign.co.uk/booking"),
        ("Geo-Targeted", "Exact Match", "[epc certificate stockport]", "primeepcdesign.co.uk/booking"),
        ("Geo-Targeted", "Phrase Match", '"epc assessor salford"', "primeepcdesign.co.uk/booking"),
        ("Geo-Targeted", "Exact Match", "[epc assessor salford]", "primeepcdesign.co.uk/booking"),
        ("Geo-Targeted", "Phrase Match", '"epc certificate oldham"', "primeepcdesign.co.uk/booking"),
        ("Geo-Targeted", "Phrase Match", '"domestic epc wigan"', "primeepcdesign.co.uk/booking"),
        ("Geo-Targeted", "Phrase Match", '"epc rochdale"', "primeepcdesign.co.uk/booking"),
        ("Geo-Targeted", "Phrase Match", '"epc assessor bury"', "primeepcdesign.co.uk/booking"),
        ("Geo-Targeted", "Phrase Match", '"epc certificate didsbury"', "primeepcdesign.co.uk/booking"),
        ("Geo-Targeted", "Phrase Match", '"epc altrincham"', "primeepcdesign.co.uk/booking"),
        ("Geo-Targeted", "Phrase Match", '"epc ashton under lyne"', "primeepcdesign.co.uk/booking"),
        ("Geo-Targeted", "Phrase Match", '"epc cheadle"', "primeepcdesign.co.uk/booking"),
        ("Geo-Targeted", "Phrase Match", '"epc assessor sale manchester"', "primeepcdesign.co.uk/booking"),
        ("Geo-Targeted", "Phrase Match", '"epc certificate trafford"', "primeepcdesign.co.uk/booking"),
        ("Geo-Targeted", "Phrase Match", '"epc warrington"', "primeepcdesign.co.uk/booking"),
    ]
    story.append(create_ad_group_table(domestic_keywords))
    story.append(Spacer(1, 14))

    # 2. Commercial EPC
    story.append(Paragraph("2. CAMPAIGN BUCKET: Commercial EPC (From £144)", h1_style))
    story.append(Paragraph("<b>Landing Page:</b> <code>https://www.primeepcdesign.co.uk/booking</code> | <b>Starting Price:</b> £144.00 (0–50m²) | <b>Level:</b> Non-Domestic Assessors", body_style))
    
    commercial_keywords = [
        ("High-Intent", "Phrase Match", '"commercial epc manchester"', "primeepcdesign.co.uk/booking"),
        ("High-Intent", "Exact Match", "[commercial epc manchester]", "primeepcdesign.co.uk/booking"),
        ("High-Intent", "Phrase Match", '"book commercial epc"', "primeepcdesign.co.uk/booking"),
        ("High-Intent", "Exact Match", "[book commercial epc]", "primeepcdesign.co.uk/booking"),
        ("High-Intent", "Phrase Match", '"commercial epc certificate cost"', "primeepcdesign.co.uk/booking"),
        ("High-Intent", "Exact Match", "[commercial epc certificate cost]", "primeepcdesign.co.uk/booking"),
        ("High-Intent", "Phrase Match", '"non domestic epc manchester"', "primeepcdesign.co.uk/booking"),
        ("High-Intent", "Exact Match", "[non domestic epc manchester]", "primeepcdesign.co.uk/booking"),
        ("High-Intent", "Phrase Match", '"commercial energy assessment £144"', "primeepcdesign.co.uk/booking"),
        ("B2B / Lease", "Phrase Match", '"commercial epc for retail shop"', "primeepcdesign.co.uk/booking"),
        ("B2B / Lease", "Phrase Match", '"commercial epc warehouse manchester"', "primeepcdesign.co.uk/booking"),
        ("B2B / Lease", "Phrase Match", '"commercial building epc assessment"', "primeepcdesign.co.uk/booking"),
        ("Geo-Targeted", "Phrase Match", '"commercial epc bolton"', "primeepcdesign.co.uk/booking"),
        ("Geo-Targeted", "Exact Match", "[commercial epc bolton]", "primeepcdesign.co.uk/booking"),
        ("Geo-Targeted", "Phrase Match", '"commercial epc stockport"', "primeepcdesign.co.uk/booking"),
        ("Geo-Targeted", "Exact Match", "[commercial epc stockport]", "primeepcdesign.co.uk/booking"),
        ("Geo-Targeted", "Phrase Match", '"commercial epc salford"', "primeepcdesign.co.uk/booking"),
        ("Geo-Targeted", "Phrase Match", '"commercial epc oldham"', "primeepcdesign.co.uk/booking"),
        ("Geo-Targeted", "Phrase Match", '"commercial epc wigan"', "primeepcdesign.co.uk/booking"),
        ("Geo-Targeted", "Phrase Match", '"commercial epc rochdale"', "primeepcdesign.co.uk/booking"),
        ("Geo-Targeted", "Phrase Match", '"commercial epc bury"', "primeepcdesign.co.uk/booking"),
        ("Geo-Targeted", "Phrase Match", '"commercial epc altrincham"', "primeepcdesign.co.uk/booking"),
        ("Geo-Targeted", "Phrase Match", '"commercial epc warrington"', "primeepcdesign.co.uk/booking"),
    ]
    story.append(create_ad_group_table(commercial_keywords))
    story.append(Spacer(1, 14))

    # 3. EICR Electrical Safety
    story.append(Paragraph("3. CAMPAIGN BUCKET: EICR Electrical Certificates (From £110)", h1_style))
    story.append(Paragraph("<b>Landing Page:</b> <code>https://www.primeepcdesign.co.uk/booking</code> | <b>Pricing:</b> Flat £110 / House £130+ | <b>Qualified &amp; DBS Checked</b>", body_style))
    
    eicr_keywords = [
        ("High-Intent", "Phrase Match", '"eicr certificate manchester"', "primeepcdesign.co.uk/booking"),
        ("High-Intent", "Exact Match", "[eicr certificate manchester]", "primeepcdesign.co.uk/booking"),
        ("High-Intent", "Phrase Match", '"book eicr report manchester"', "primeepcdesign.co.uk/booking"),
        ("High-Intent", "Exact Match", "[book eicr report manchester]", "primeepcdesign.co.uk/booking"),
        ("High-Intent", "Phrase Match", '"landlord electrical safety certificate manchester"', "primeepcdesign.co.uk/booking"),
        ("High-Intent", "Exact Match", "[landlord electrical safety certificate manchester]", "primeepcdesign.co.uk/booking"),
        ("High-Intent", "Phrase Match", '"cheap eicr certificate"', "primeepcdesign.co.uk/booking"),
        ("High-Intent", "Phrase Match", '"eicr from £110"', "primeepcdesign.co.uk/booking"),
        ("Compliance", "Phrase Match", '"electrical installation condition report manchester"', "primeepcdesign.co.uk/booking"),
        ("Compliance", "Exact Match", "[electrical installation condition report manchester]", "primeepcdesign.co.uk/booking"),
        ("Compliance", "Phrase Match", '"landlord eicr test quote"', "primeepcdesign.co.uk/booking"),
        ("Geo-Targeted", "Phrase Match", '"eicr bolton"', "primeepcdesign.co.uk/booking"),
        ("Geo-Targeted", "Exact Match", "[eicr bolton]", "primeepcdesign.co.uk/booking"),
        ("Geo-Targeted", "Phrase Match", '"eicr certificate stockport"', "primeepcdesign.co.uk/booking"),
        ("Geo-Targeted", "Exact Match", "[eicr certificate stockport]", "primeepcdesign.co.uk/booking"),
        ("Geo-Targeted", "Phrase Match", '"electrical certificate salford"', "primeepcdesign.co.uk/booking"),
        ("Geo-Targeted", "Phrase Match", '"eicr oldham"', "primeepcdesign.co.uk/booking"),
        ("Geo-Targeted", "Phrase Match", '"landlord electrical check wigan"', "primeepcdesign.co.uk/booking"),
        ("Geo-Targeted", "Phrase Match", '"eicr rochdale"', "primeepcdesign.co.uk/booking"),
        ("Geo-Targeted", "Phrase Match", '"eicr certificate bury"', "primeepcdesign.co.uk/booking"),
        ("Geo-Targeted", "Phrase Match", '"eicr didsbury"', "primeepcdesign.co.uk/booking"),
        ("Geo-Targeted", "Phrase Match", '"eicr altrincham"', "primeepcdesign.co.uk/booking"),
        ("Geo-Targeted", "Phrase Match", '"eicr test warrington"', "primeepcdesign.co.uk/booking"),
    ]
    story.append(create_ad_group_table(eicr_keywords))
    story.append(Spacer(1, 14))

    # 4. Floor Plans & CAD Drafting
    story.append(Paragraph("4. CAMPAIGN BUCKET: Floor Plans &amp; CAD Drafting", h1_style))
    story.append(Paragraph("<b>Landing Page:</b> <code>https://www.primeepcdesign.co.uk/floor-plans-drafting</code> | <b>Compliance:</b> RICS &amp; Land Registry PG40", body_style))
    
    floorplan_keywords = [
        ("High-Intent", "Phrase Match", '"floor plans for estate agents manchester"', "primeepcdesign.co.uk/floor-plans-drafting"),
        ("High-Intent", "Exact Match", "[floor plans for estate agents manchester]", "primeepcdesign.co.uk/floor-plans-drafting"),
        ("High-Intent", "Phrase Match", '"lease plan drawing service manchester"', "primeepcdesign.co.uk/floor-plans-drafting"),
        ("High-Intent", "Exact Match", "[lease plan drawing service manchester]", "primeepcdesign.co.uk/floor-plans-drafting"),
        ("High-Intent", "Phrase Match", '"land registry compliant lease plans"', "primeepcdesign.co.uk/floor-plans-drafting"),
        ("High-Intent", "Phrase Match", '"cad drafting services manchester"', "primeepcdesign.co.uk/floor-plans-drafting"),
        ("High-Intent", "Phrase Match", '"2d 3d floor plan drafting"', "primeepcdesign.co.uk/floor-plans-drafting"),
        ("Commercial/HMO", "Phrase Match", '"hmo conversion floor plans manchester"', "primeepcdesign.co.uk/floor-plans-drafting"),
        ("Commercial/HMO", "Phrase Match", '"paper to cad conversion manchester"', "primeepcdesign.co.uk/floor-plans-drafting"),
        ("Commercial/HMO", "Phrase Match", '"property measurement survey manchester"', "primeepcdesign.co.uk/floor-plans-drafting"),
        ("Geo-Targeted", "Phrase Match", '"floor plan services bolton"', "primeepcdesign.co.uk/floor-plans-drafting"),
        ("Geo-Targeted", "Phrase Match", '"lease plans stockport"', "primeepcdesign.co.uk/floor-plans-drafting"),
        ("Geo-Targeted", "Phrase Match", '"architectural drafting salford"', "primeepcdesign.co.uk/floor-plans-drafting"),
        ("Geo-Targeted", "Phrase Match", '"floor plans oldham"', "primeepcdesign.co.uk/floor-plans-drafting"),
        ("Geo-Targeted", "Phrase Match", '"lease plan drawings wigan"', "primeepcdesign.co.uk/floor-plans-drafting"),
        ("Geo-Targeted", "Phrase Match", '"cad floor plans altrincham"', "primeepcdesign.co.uk/floor-plans-drafting"),
    ]
    story.append(create_ad_group_table(floorplan_keywords))
    story.append(Spacer(1, 14))

    # 5. Design Consultancy & SAP
    story.append(Paragraph("5. CAMPAIGN BUCKET: Design Consultancy &amp; SAP Calculations", h1_style))
    story.append(Paragraph("<b>Landing Page:</b> <code>https://www.primeepcdesign.co.uk/#contact</code> | <b>Focus:</b> Building Regs Part L &amp; New Build Compliance", body_style))
    
    sap_keywords = [
        ("High-Intent", "Phrase Match", '"sap calculations manchester"', "primeepcdesign.co.uk/#contact"),
        ("High-Intent", "Exact Match", "[sap calculations manchester]", "primeepcdesign.co.uk/#contact"),
        ("High-Intent", "Phrase Match", '"sap assessor new build manchester"', "primeepcdesign.co.uk/#contact"),
        ("High-Intent", "Phrase Match", '"new build epc compliance manchester"', "primeepcdesign.co.uk/#contact"),
        ("Consultancy", "Phrase Match", '"energy efficiency design consultant"', "primeepcdesign.co.uk/#contact"),
        ("Consultancy", "Phrase Match", '"building regulations part l compliance"', "primeepcdesign.co.uk/#contact"),
        ("Geo-Targeted", "Phrase Match", '"sap calculations bolton"', "primeepcdesign.co.uk/#contact"),
        ("Geo-Targeted", "Phrase Match", '"sap assessor stockport"', "primeepcdesign.co.uk/#contact"),
        ("Geo-Targeted", "Phrase Match", '"energy consultant salford"', "primeepcdesign.co.uk/#contact"),
        ("Geo-Targeted", "Phrase Match", '"sap calculations cheshire"', "primeepcdesign.co.uk/#contact"),
    ]
    story.append(create_ad_group_table(sap_keywords))
    story.append(Spacer(1, 14))

    # Master Negative Keyword List
    story.append(Paragraph("Master Negative Keyword Exclusions (Account Level)", h1_style))
    story.append(Paragraph("The following informational, DIY, academic, training, and portal login terms must be added to the Account-Level Negative Keyword List to prevent budget waste:", body_style))

    negatives_data = [
        [
            Paragraph("<b>Category</b>", table_header_style),
            Paragraph("<b>Negative Keyword Queries (Phrase Match)</b>", table_header_style)
        ],
        [
            Paragraph("<b>Free / DIY Informational</b>", table_cell_bold),
            Paragraph("<code>\"free epc\", \"free epc certificate\", \"how to get free epc\", \"check epc free\", \"epc register search\", \"epc register gov uk\", \"find my epc online\", \"what is an epc\", \"how long is epc valid for\", \"diy epc\", \"can i do my own epc\"</code>", table_cell_style)
        ],
        [
            Paragraph("<b>Training &amp; Careers</b>", table_cell_bold),
            Paragraph("<code>\"epc training courses\", \"how to become an epc assessor\", \"domestic energy assessor course\", \"dea training manchester\", \"epc assessor qualification\", \"city and guilds epc training\", \"energy assessor salary\", \"epc jobs manchester\"</code>", table_cell_style)
        ],
        [
            Paragraph("<b>Accreditation &amp; Portals</b>", table_cell_bold),
            Paragraph("<code>\"elmhurst energy login\", \"stroma login\", \"quidos portal\", \"epc register portal login\", \"gov uk epc lodgement\", \"epc software download\", \"autocad download free\"</code>", table_cell_style)
        ],
        [
            Paragraph("<b>Grants &amp; Competitors</b>", table_cell_bold),
            Paragraph("<code>\"free boiler scheme\", \"eco4 grant login\", \"council tax band check\", \"free floor plan software\", \"home energy report download\"</code>", table_cell_style)
        ]
    ]
    t_neg = Table(negatives_data, colWidths=[140, 383])
    t_neg.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), ALERT_RED),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('PADDING', (0, 0), (-1, -1), 6),
        ('GRID', (0, 0), (-1, -1), 0.5, BORDER_COLOR),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [WHITE, BG_LIGHT]),
    ]))
    story.append(t_neg)
    story.append(Spacer(1, 14))

    # Campaign Settings & Recommendations Box
    recs_data = [
        [
            Paragraph("<b>RECOMMENDED GOOGLE ADS BIDDING &amp; ASSET SETTINGS</b>", table_header_style)
        ],
        [
            Paragraph(
                "• <b>Location Radius:</b> United Kingdom > Greater Manchester (+50 miles radius).<br/>"
                "• <b>Bid Strategy:</b> Start with <i>Maximize Clicks</i> (Max CPC Bid Cap: £1.80–£2.40) until 30 conversions, then shift to <i>Target CPA</i> (£12–£18).<br/>"
                "• <b>Call Extension:</b> Enable <code>07308658247</code> across all mobile ads.<br/>"
                "• <b>Sitelinks:</b> Domestic EPC (£50) | Commercial EPC (£144) | CAD Floor Plans | 4.9★ Customer Reviews.<br/>"
                "• <b>Callouts:</b> Fast 24-48h Turnaround | Accredited Assessors | Fixed Price Guarantee | DBS Checked.",
                table_cell_style
            )
        ]
    ]
    t_recs = Table(recs_data, colWidths=[523])
    t_recs.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), PRIMARY_GREEN),
        ('BACKGROUND', (0, 1), (-1, 1), BG_LIGHT),
        ('BOX', (0, 0), (-1, -1), 1, PRIMARY_GREEN),
        ('PADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(t_recs)

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Successfully generated PDF: {filename}")

if __name__ == "__main__":
    output_filename = "d:/projects/prime epc/PrimeEPC/edcfrontend/PrimeEPC_Google_Ads_Keywords_Strategy.pdf"
    build_pdf(output_filename)
