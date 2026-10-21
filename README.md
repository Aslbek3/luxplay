# LUXPLAY

O'yinchilar uchun yagona platforma — demo versiya.

**Jonli sayt:** https://aslbek3.github.io/luxplay/

## Nima qiladi

O'yinlar, ovozli xonalar, do'stlar, profil va virtual sovg'alar
bitta ilovada.

## Imkoniyatlar

- **O'yinlar katalogi** — 8 ta o'yin, 5 ta janr bo'yicha filtr, qidiruv
- **Ovozli xonalar** — jonli xonalar ro'yxati, kirish/chiqish holati
- **Do'stlar** — onlayn/oflayn holat, do'st qo'shish va olib tashlash
- **Virtual sovg'alar** — 6 xil sovg'a, 💎 tanga balansidan yechiladi
- **Premium** — obuna demo oqimi, oltin profil ramkasi
- **Profil** — daraja, balans, yuborilgan sovg'alar, faol xona

## Daromad modeli (reja)

| Manba | Izoh |
|---|---|
| Premium obuna | 29 000 so'm/oy — oltin nik, reklamasiz, oylik 💎 |
| Virtual sovg'alar | 10–1000 💎, tanga sotib olinadi |
| Hamkorlik | o'yin studiyalari bilan reklama |

## Tarkibi

| Fayl | Tavsif |
|---|---|
| `public/index.html` | Barcha ekranlar |
| `public/css/style.css` | Tungi mavzu, `:root` tokenlari |
| `public/js/main.js` | Katalog, xonalar, do'stlar, sovg'alar |

Backend yo'q — sof statik sayt. Tangalar, do'stlar va sovg'alar
`localStorage`da, faqat shu brauzerda.

Dizayn tizimi UstaTop bilan bir xil tuzilmada, lekin **tungi mavzuda**
(`#15122b` fon, `#6b4bf0` binafsha) — o'yin platformalarida bu odatiy
va ko'zni charchatmaydi. Batafsil: `ustatop/DESIGN.md`.

## Mahalliy ishga tushirish

```bash
cd public
python -m http.server 8000
```

## Deploy

```bash
git subtree push --prefix public origin gh-pages
```

## Holati

Demo. Haqiqiy versiya uchun kerak: akkauntlar, ovozli aloqa (WebRTC),
real vaqt chat, to'lov tizimi va o'yin integratsiyasi — bular eng og'ir
qism, shuning uchun UstaTop va IjaraGo'dan keyin ko'tariladi.
