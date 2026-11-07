"""Voice: non-grandiose, inviting, friendly, clear. Halli telling you about the project in his own words,
not selling it. No slogans, no punchy reveals.

Writes the Cargo paste files for the project pages Halli reviewed in 'Project texts: review'.
Each file is pasted as plain text into a Cargo project's HTML editor (it replaces the old content).
Marks: hc-label (above a picture), hc-big (big line), hc-num (section heading), hc-cap (under a picture)."""
import os
C = 'https://payload.cargocollective.com/1/9/304840/'
G = 'https://hallicivelek.github.io/hallicivelek-site/assets/'
OUT = os.path.join(os.path.dirname(__file__), '..', '..', 'paste-files')

def img(path, w, h, alt=''):
    src = path if path.startswith('http') else C + path
    return f'<img src="{src}" width="{w}" height="{h}" alt="{alt}">'
def label(t): return f'<div class="hc-label">{t}</div>'
def big(t): return f'<div class="hc-big">{t}</div>'
def num(t): return f'<div class="hc-num">{t}</div>'
def p(*paras): return '\n\n'.join(paras) + '\n'   # text: a blank line between paragraphs

PAGES = {}

PAGES['Retro-Stefson-Retro-Stefson'] = [
  p("Visual identity, concept, art direction and design for Retro Stefson's self-titled album, 2012."),
  img('4441525/RetroStefson-RECD020-Packshot-2-litil.jpg', 670, 389, "Retro Stefson's self-titled album: the CD and the cards."),
  big('A cover for every band member.'),
  p("My rule for Retro Stefson's artwork was that the whole band should always be visible. There were seven members.",
    "On the limited die-cut CD, each member's photograph came on four double-sided cards, and you arranged them to choose your own front. The eighth side held the credits.",
    "The digipaks each showed a different member on the front. You couldn't swap those, but you chose your cover at the shop."),
  num('Choose your cover'),
  label('Gylfi, drums'), img('4441525/hallicivelek_RetroStefson-Gylfi_702.jpg', 702, 657),
  label('Unnsteinn Manuel, vocals'), img('4441525/hallicivelek_RetroStefson-Unnsteinn_702.jpg', 702, 657),
  label('Þorbjörg, synths'), img('4441525/hallicivelek_RetroStefson-Thorbjorg_702.jpg', 702, 657),
  label('Haraldur Ari, vocals, percussion'), img('4441525/hallicivelek_RetroStefson-Haraldur_702.jpg', 702, 657),
  label('Jon Ingvi, keyboards'), img('4441525/hallicivelek_RetroStefson-JonIngvi_702.jpg', 702, 657),
  label('Logi Pedro, bass, synths'), img('4441525/hallicivelek_RetroStefson-Logi_702.jpg', 702, 657),
  label('Þórður, guitars'), img('4441525/hallicivelek_RetroStefson-Thordur_702.jpg', 702, 657),
  p("The photographs came from playing with coloured light and powder, thrown on instinct. When you work with a talented photographer, producer, stylist and band, and trust the process, things work out.",
    "Released as a limited double gatefold vinyl, a white gatefold vinyl, the limited die-cut CD, and the digipaks."),
  label('Vinyl labels'),
  img('4441525/Retro-Stefson-2012-vinyl-label-A_641.jpg', 641, 641),
  img('4441525/Retro-Stefson-2012-vinyl-label-B_641.jpg', 641, 641),
  img('4441525/Retro-Stefson-2012-vinyl-label-C_641.jpg', 641, 641),
  img('4441525/Retro-Stefson-2012-vinyl-label-D_641.jpg', 641, 641),
  p("Photography: Ari Magg."),
]

PAGES['Retro-Stefson-Qween'] = [
  p("Logo illustration and graphic design for Retro Stefson's 7-inch picture vinyl, Qween."),
  img('4441563/retroqweenfront.jpg', 600, 600, 'The picture disc, band side.'),
  big('The band on one side, the logo on the other.'),
  p("I had two rules for Retro Stefson's artwork. The whole band is always on it, and so is the logo, the core of who they are.",
    "I started with sketches in another direction, but remembered (and reminded myself) of my own rules. So one side has the band members, and the other side the logo."),
  img('4441563/RetroStefson-Qweensticker.jpg', 600, 271),
  img('4441563/RetroStefson-Qweenback.jpg', 600, 600, 'The picture disc, logo side.'),
  p("Photography: Ari Magg."),
]

PAGES['Retro-Stefson-Kimbabwe'] = [
  p("Visual identity, art direction and graphic design for Retro Stefson's second album, Kimbabwe, 2010."),
  img('4441031/hallicivelek-retrostefson-kimbabwe-front_702.jpg', 702, 657, 'The Kimbabwe cover: the band on an island of wooden pallets, under a painted sky.'),
  big('Kimbabwe is a made-up place.'),
  p("The idea was that Kimbabwe is an imaginary place, somewhere that exists on its own, apart from everywhere else. That's how I saw Retro Stefson too. Their songs, and their mix of ideas and genres, didn't sound like anyone else.",
    "That's why the cover is an island built from wooden pallets, with a sea, and a blue sky hung up as a canvas behind it. Everything is handmade, because it's an imaginary place."),
  num('Made with the band'),
  p("I always brought the band into the making, so the work would be theirs too. They built the set, painted, and coloured the costumes, and we met often to talk through ideas."),
  label('The limited edition: one sheet of paper'),
  img('4441031/retrostefson_kimbabwe1.jpg', 600, 526),
  img('4441031/retrostefson_kimbabwe2.jpg', 600, 526),
  p("A special place deserved its own packaging. The limited edition CD came in a single sheet of paper.",
    "I made it myself, from prototypes, not from an existing template. I worked out the fold, where it should be perforated, and how it would work both fresh from the store, as a CD holder, and after you tore off the poster and folded it again. It was a clever piece of paper manoeuvring. :)",
    "Released as a limited poster-pack, a digipak and vinyl."),
]

PAGES['Retro-Stefson-Montana'] = [
  p("Visual identity, art direction and graphic design for Retro Stefson's debut album, Montaña, 2008."),
  img('4441046/Halli-Civelek---Retro-Stefson---Montana-2013---front_700.jpg', 700, 630, 'The Montaña cover.'),
  big('Made with the band.'),
  p("The band were part of the making from the start, building and painting with me.",
    "The first pressing came out in a stand-in cover that never felt like them. The second pressing got the cover we had planned all along."),
  img('4441046/Halli-Civelek---Retro-Stefson---Montana-2013---back_700.jpg', 700, 631, 'The back cover.'),
  label('The poster'),
  img('4441046/Halli-Civelek---Retro-Stefson---Montana-2013---poster_1000.jpg', 1000, 507),
  p("Lettering on the poster co-created with Lóa Hlín Hjálmtýsdóttir.",
    "I miss this band, they were a good bunch to work with."),
]

PAGES['Retro-Stefson-visual-identity'] = [
  p("The Retro Stefson logo, from a t-shirt drawing in 2005 to everything the band put out."),
  img('4441041/retrostefson_logo.png', 450, 403, 'The original Retro Stefson logo.'),
  big('Beast-scratches in the ice.'),
  p("I first drew the logo as part of a t-shirt illustration back in 2005. The jaggedy pointy lines were scratches in the ice by the t-shirt beast."),
  img('4441041/retrostefson_dyr_halli_1020.jpg', 1020, 1176, 'The t-shirt illustration: the beast and its scratches in the ice.'),
  p("It became the band's logo, on every album, t-shirt, poster, promo and video."),
  label('Over the years I polished the edges, removed the fishbones…'),
  '<div class="hc-video" data-src="' + G + 'retro-stefson/logo-flip.mp4" data-poster="' + G + 'retro-stefson/logo-flip.jpg" data-w="700" data-alt="The Retro Stefson logo flipping through its uses over the years"></div>',
]

FM = '4441114/'
songs = ['Frequency', 'Underwear', 'I Can Feel Love', 'Tropical', 'Pump', 'Par Avion', 'VHS', 'Lotus', 'Optical', 'Synthia', 'President']
files = ['frequency', 'underwear', 'icanfeellove', 'tropical', 'pump', 'paravion', 'vhs', 'lotus', 'optical', 'synthia', 'president']
PAGES['FM-Belfast-how-to-make-friends'] = [
  p("Visual identity, art direction and design for FM Belfast's debut album, How to Make Friends, 2008."),
  img(FM + 'Halli-FM-Belfast-front.jpg', 670, 610, 'The front cover.'),
  big('One card for every song.'),
  p("The album came with six double-sided cards: artwork for each of the 11 songs, plus a band photo."),
  img(FM + 'Halli-FM-Belfast-back.jpg', 670, 610, 'The back cover.'),
  label('Inside artwork'), img(FM + 'Halli-FM-Belfast-artwork-inside.jpg', 670, 205),
  label('Close up'),
  img(FM + 'Halli-FM-Belfast-inside1.jpg', 670, 610), img(FM + 'Halli-FM-Belfast-inside2.jpg', 670, 610), img(FM + 'Halli-FM-Belfast-inside3.jpg', 670, 610),
  num('Made together'),
  p("Lóa Hlín Hjálmtýsdóttir, who is in the band, drew the illustrations. I art directed the whole way, from the cards and colours on the front to the hand-written track titles on the back."),
] + [x for i, (t, f) in enumerate(zip(songs, files)) for x in (label(f'{i + 1} – {t}'), img(FM + f'halli-fmbelfast-{f}.jpg', 670, 670))] + [
  label('FM Belfast'), img(FM + 'halli-fmbelfast-band.jpg', 670, 670),
]

PAGES['Pedro-Pilatus-album-artwork'] = [
  p("Art direction and illustration for Pedro Pilatus: the album Calia, and a Christmas release that December, 2012."),
  label('Calia'),
  img('4440727/PedroPilatus-lettering1.jpg', 670, 670),
  big('No photos, so I drew him.'),
  p("Pedro Pilatus is the artist's alias, and we had no photographs, so I created this illustrated character.",
    "The label had a template for the artwork, with a circular form, which I turned into a necklace. Gangsta style, hence the attitude of the character."),
  label('Christmas release'),
  img('4440727/hallicivelek-PedroPilatus-TheGoGettin_670.jpg', 670, 670),
  p("The same character appeared as Santa on the Christmas release. Same angry (street) face as before. :)"),
]

SA = '4441214/'
PAGES['Sesar-A-Stormurinn-a-undan-logninu'] = [
  p("Visual identity, art direction and design for Sesar A's Stormurinn á eftir logninu (The Storm After the Calm), the first hip hop album in Icelandic, 2001."),
  img(SA + 'SesarA-StormurinnLP.jpg', 670, 603, 'The album cover.'),
  big('A hip hop album for people who don\'t listen to hip hop.'),
  p("Sesar A is known as the grandfather of Icelandic hip hop.",
    "My thinking was that the hip hop heads would hear about the album, buy it and listen to it, regardless of the design. So I focused on artwork that would get listeners of other kinds of music to pick it up and check it out. People who would never pick up a hip-hop-looking album.",
    "The booklet folds out. On each page is a painting of one of Sesar A's favourite things."),
  label('His favourite things'),
  img(SA + 'hallicivelek-sesara-hat_386.jpg', 386, 386), img(SA + 'hallicivelek-sesara-shoes_386.jpg', 386, 386),
  img(SA + 'hallicivelek-sesara-vinyl_386.jpg', 386, 386), img(SA + 'hallicivelek-sesara-mic_386.jpg', 386, 386),
  p("Paintings by Trausti Traustason. In collaboration with Sveinbjörn Pálsson."),
]

AP = '4441090/'
PAGES['Apparat-Organ-Quartet-Romantika'] = [
  p("Visual identity, art direction, graphic design and illustration for Apparat Organ Quartet's Romantika. The title track is my favourite song by the band."),
  img(AP + 'Halli---Apparat-Romantika_612.jpg', 612, 612, 'The Romantika cover.'),
  big('The band as a machine.'),
  p("We thought of the five-piece quartet as a machine of sorts. The cover folds out to show the layered machinery behind the simple device on the front."),
  img(AP + 'halli_apparat_cd.jpeg', 500, 257), img(AP + 'hallicivelek-apparatorganquartet-romantika-cd_500.jpg', 500, 500),
  label('Inside spread, the fold was inspired by MAD Magazine'),
  img(AP + 'hallicivelek-apparat-romantika-machines-large_940.jpg', 940, 317),
  img(AP + 'halli_apparat_fold_stort.jpg', 450, 944),
  p("Limited edition of 500 copies. Made with Jeff Ramsey.",
    "Recognised for album cover design at the FÍT design awards in 2004, together with Jeff Ramsey."),
]

PAGES['Apparat-Organ-Quartet'] = [
  p("Logo for Apparat Organ Quartet, 2000."),
  img('4441133/apparat_logo.png', 450, 200, 'The Apparat Organ Quartet logo.'),
  big('Triangles that spell APPARAT.'),
]

PAGES['Breakbeat'] = [
  p("Poster for Breakbeat, a monthly drum'n'bass night, 2006."),
  img('4440996/hallicivelek-breakbeat_940.jpg', 940, 1030, 'The Breakbeat poster.'),
  big('A poster for a new crowd.'),
  p("My thinking was that most people who knew about Breakbeat would come anyway. The poster was meant to remind them, but more importantly to invite a new crowd: people who wouldn't necessarily respond to the usual drum'n'bass visuals."),
  num('The series'),
  p("Breakbeat's posters were made by a different designer each month. Once you were nominated by the previous designer, you did your poster and then nominated the next one. Every designer had free rein."),
]

RM = '4441021/'
PAGES['rimnamin'] = [
  p("Visual identity, art direction, concept, illustration and design for Rímnamín, the first Icelandic hip hop compilation, 2002."),
  img(RM + 'halli_rimnamin_front.jpg', 450, 450, 'The Rímnamín cover: a vitamin bottle with a new label.'),
  big('A vitamin bottle for Icelandic hip hop.'),
  p("I came up with the idea of naming this compilation something other than rapp.is or Ice Rap. A title like that would push away everyone but the hip hop heads.",
    "Rímnamín is a twist on the word vítamín. I saw the album as a container for brilliant stöff, and the name and the packaging came from that. I bought a vitamin bottle, then designed a new label for it."),
  label('The label'),
  img(RM + 'halli_rimnamin_detail.jpg', 450, 450),
  p("The wording on the bottle is tongue-in-cheek. The front says it's a new and <i>bragbætt</i> blend of Icelandic ingredients. Flavour-enhanced in Icelandic is bragðbætt, and a rhyme is brag, so bragbætt is a new word: rhyme-enhanced, really. On the back it says to keep it in a warm and sunny place, which is usually not what any packaging recommends."),
  label('Left behind, like everyday things'),
  img(RM + 'halli_rimnamin_bus.jpg', 339, 339), img(RM + 'halli_rimnamin_carpark.jpg', 339, 339),
  img(RM + 'halli_rimnamin_stytta.jpg', 339, 339), img(RM + 'halli_rimnamin_sun.jpg', 339, 339),
  img(RM + 'halli_rimnamin_trash.jpg', 339, 339),
  p("In the booklet, the bottle sits in abandoned places: a car park, a bus stop, on top of a rubbish bin. Like something people had left behind, easy to overlook, the way everyday things are. Those are the places where you find household products, plastic bottles and biscuit wrappers, not rare things. The message being that this album, and Icelandic hip hop, should be a household thing.",
    "Photography: Haraldur Jónasson. Layout in collaboration with Sveinbjörn Pálsson."),
]

PAGES['Magse-Maximum-Weights-Vol-1 (new project)'] = [
  p("Cover art and design for Magse's Maximum Weights Vol. 1, 1999."),
  label('Front'),
  img(G + 'magse/magse-front.jpg', 599, 580, 'Maximum Weights Vol. 1, front: Magse drawn South Park style, with a speaker.'),
  big('It was 1999, DIY all the way.'),
  p("Homemade hip hop, homemade artwork. Two friends having fun: South Park was everywhere, so we made the cover a comment on that, with Magse and the crew drawn South Park style."),
  label('Back'),
  img(G + 'magse/magse-back.jpg', 599, 523, 'Maximum Weights Vol. 1, back: two characters at the decks, and the track list.'),
  p('Part of my early years in Icelandic hip hop, followed by <a href="/Sesar-A-Stormurinn-a-undan-logninu">Sesar A\'s Stormurinn á eftir logninu</a> (2001) and <a href="/rimnamin">Rímnamín</a> (2002), the first Icelandic hip hop compilation.'),
]

PAGES['Fastland-soccer-uniform'] = [
  p("Soccer uniform for Fastland, a former ad agency and design house (RIP), 2004."),
  img('4440861/halli_fastland_uniform.gif', 215, 350, 'The Fastland soccer uniform.'),
  big("Perhaps the world's first soccer uniform in CMYK."),
  p("Our <i>team</i> sucked. Our <i>design</i> got a recognition at the FÍT design awards.",
    "Made with Árni Þór Árnason."),
]

if __name__ == '__main__':
    os.makedirs(OUT, exist_ok=True)
    for slug, parts in PAGES.items():
        text = '\n'.join(x.rstrip('\n') + ('\n' if x.endswith('\n') else '') for x in parts)
        text = text.replace('\n\n\n', '\n\n').strip() + '\n'
        with open(os.path.join(OUT, slug + '.txt'), 'w') as f: f.write(text)
    print(len(PAGES), 'files in', os.path.normpath(OUT))
