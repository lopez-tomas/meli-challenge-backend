const getSellerNicknameFromUrl = (url) => {
  return url.split('.ar/')[1]
}

const capitalizeFirstLetter = (title) => {
  const titles = {
    platinum: 'Platinum',
    gold: 'Gold',
  }

  return titles.hasOwnProperty(title) ? titles[title] : title
}

export {
  getSellerNicknameFromUrl,
  capitalizeFirstLetter,
}
