import React, { useState } from "react";
import { Link } from "react-router-dom";

const Image = (props: { name: string }) => {
  const { name } = props;
  const words = name.split("_");
  const techniqueFullName = {
    inlp: "INLP",
    rlace: "RLACE",
    rdm: "random vectors",
  }[words[0]];
  const measurementName =
    words[1] === "dims"
      ? "the number of dimension edited changes"
      : words[2] === "layer"
      ? "the edited layer changes"
      : "the number of edited layer changes";
  const additionalInfo =
    words[1] === "8d"
      ? " (8 dimensions edited)"
      : words[1] === "32d"
      ? " (32 dimensions edited)"
      : words[1] === "dims"
      ? "(at layer 6/11)"
      : "";
  const fullName = `Bias with ${techniqueFullName} as ${measurementName}`;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "0.5em",
      }}
    >
      <div>
        <i>{fullName}</i>
      </div>
      <div>
        <i>{additionalInfo}</i>
      </div>
      <div style={{ overflow: "hidden" }}>
        <img
          style={{ marginTop: "-15px", width: "100%" }}
          src={`/result_imgs/${name}.png`}
          alt={fullName}
        />
      </div>
    </div>
  );
};

type CountergenResultsProps = {};

const CountergenResults = (props: CountergenResultsProps) => {
  return (
    <div className="container">
      <div className="col-md-10 col-md-offset-1">
        <h1>Results</h1>
        <p>
          <i>
            <b>Results are prelimenary</b>: larger real life experiments are
            needed to assess the viability of this approach. Please view these
            results as hints aimed at helping you if you want to experiment with
            model editing.
          </i>
        </p>
        <p>
          <i>More results will come in the next months!</i>
        </p>
        <h2>Evaluation Method</h2>
        <p>
          We compare the probability that a model generate one of the expected
          outputs when the subjects of the input are female and when they are
          male.
        </p>
        <p>The datasets used are:</p>
        <ul>
          <li>The stereotype dataset from ZZZ</li>
          <li>The questions from the doublebind experiment ZZZ</li>
        </ul>
        <h2>
          Observation 0: In some situation, language models exhibit strong
          behavior changes based on the gender of the subjects
        </h2>
        <p>On GPT-3 (175B parameters) YYY</p>
        <p>On Instruct GPT (175B parameters) YYY</p>
        <p>On OpenAI Curie (13B parameters) YYY</p>
        <p>On OpenAI Babbage (~3B parameters) YYY</p>
        <p>On OpenAI Ada (~1B parameters) YYY</p>
        You can find similar results yourself by using the{" "}
        <Link to="/countergenweb">Countergen Web Tool</Link>
        <h2>Editing Method</h2>
        <ul>
          <li>
            We measured model activations on the stereotype dataset and edited
            the model to reduce this bias by applying INLP or RLACE on
            intermediate activations of the neural network.
          </li>
          <li>
            Finding the relevant directions in the activations is a noisy
            process. We repeat the process 5 times and show the result of each
            run.
          </li>
          <li>
            We then measured the relative probability between completions
            following inputs with a female subject and inputs with male subjects
            on both stereotypes data and the doublebind data as validation.
          </li>
        </ul>
        <h2>
          Observation 1: Bias is easier to remove in the middle of the network
        </h2>
        <p>
          Applying RLACE or INLP to intermediate activations slightly reduces
          the bias of the model. But it works better and generalize a bit more
          to the validation set (the doublebind sociology experiment) when
          editing is done in the middle of the network, where the network
          probably has a crisper representation of "male" and "female".
        </p>
        <div className="row">
          <div className="col-md-6">
            <Image name="inlp_8d_layer" />
          </div>
          <div className="col-md-6">
            <Image name="rlace_8d_layer" />
          </div>
        </div>
        <h2>Observation 2: The bias is not encoded in a linear way</h2>
        <p>
          Though RLACE is able to make any linear classifier fail separation
          between male and female with a rank-8 projection, we found that, no
          matter where the projection is done, and how many dimensions are
          removed, model bias isn't eliminated.
        </p>
        <div className="row">
          <div className="col-md-6">
            <Image name="rlace_8d_layer" />
          </div>
          <div className="col-md-6">
            <Image name="rlace_dims" />
          </div>
        </div>
        <h2>Additionnal remarks</h2>
        <h3>Comparison with picking random dimensions</h3>
        <p>
          Projecting activation on random directions increases noise, and
          reduces bias a little when many dimensions are removed. It performs
          worse than applying INLP and RLACE to intermediate activations.
        </p>
        <div className="row">
          <div className="col-md-6">
            <Image name="rdm_dims" />
          </div>
          <div className="col-md-6">
            <Image name="rdm_8d_layer" />
          </div>
        </div>
        <h3>Why are performance before edit different?</h3>
        <p>
          For each experiment, we pick the variations once. This higher or lower
          measured bias. Because no new variation is generated when editing the
          model, this is a fair and slightly less noisy reference point we can
          compare the editing methods against.
        </p>
        <h3>Where can I find the detail of the experiments?</h3>
        <p>Here are the notebooks used to produce the results above:</p>
        <ul>
          <li>
            <a href="https://www.kaggle.com/code/fabienroger/editing-2r">
              https://www.kaggle.com/code/fabienroger/editing-2r
            </a>{" "}
            (Number of dimensions for RLACE)
          </li>
          <li>
            <a href="https://www.kaggle.com/code/fabienroger/editing-3-8dim">
              https://www.kaggle.com/code/fabienroger/editing-3-8dim
            </a>{" "}
            (Most effective layer for INLP)
          </li>
          <li>
            <a href="https://www.kaggle.com/code/fabienroger/editing-3r-8dim">
              https://www.kaggle.com/code/fabienroger/editing-3r-8dim
            </a>{" "}
            (Most effective layer for RLACE)
            <li>
              <a href="https://www.kaggle.com/code/fabienroger/editing-2-3-4-random">
                https://www.kaggle.com/code/fabienroger/editing-2-3-4-random
              </a>{" "}
              (Measurements when choosing directions at random)
            </li>
          </li>
        </ul>
        <p>
          We experiments in other setups, editing multiple layers at once,
          editing more layers, and methods to find the relevant directions
          faster. If you want to know more, please reach out!
        </p>
      </div>
    </div>
  );
};

export default CountergenResults;
