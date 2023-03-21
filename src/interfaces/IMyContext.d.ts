interface MySceneSession extends Scenes.SceneSessionData {
    story: {
        title: string;
        body: string;
    };
    isInputTitle: boolean;
    prevMessage: number;
}
export type MyContext = Scenes.SceneContext<MySceneSession>;
