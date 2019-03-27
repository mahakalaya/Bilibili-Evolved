export const map = new Map([
    [`主站`, `ホーム`],
    [`画友`, `絵画`],
    [`音频`, `音楽`],
    [`游戏中心`, `ゲーム`],
    [`直播`, {
        selector: `.elevator-module .nav-list .item`,
        not: true,
        text: `生放送`,
    }],
    [`会员购`, `ショップ`],
    [`漫画`, `漫画`],
    [`下载APP`, `アプリ`],
    [`大会员`, `会員`],
    [`消息`, `通知`],
    [`动态`, `情報`],
    [`稍后再看`, `後で鑑賞`],
    [`收藏`, `お気に入り`],
    [`历史`, `視聴履歴`],
    [`投稿`, `投稿`],
    /* Your translation here */
    [`*`, [
        /* CSS translation here */

    ]],
]);
export default {
    export: { map },
};